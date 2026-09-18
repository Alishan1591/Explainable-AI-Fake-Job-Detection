import os
import joblib
import shap
import numpy as np
import pandas as pd

from scipy.sparse import hstack, load_npz


# =========================================================
# MODEL PATH
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_DIR = os.path.join(BASE_DIR, "models")


# =========================================================
# LOAD TRAINED MODELS
# =========================================================

svm_model = joblib.load(
    os.path.join(
        MODEL_DIR,
        "fake_job_svm_model.pkl"
    )
)

tfidf = joblib.load(
    os.path.join(
        MODEL_DIR,
        "tfidf_vectorizer.pkl"
    )
)

encoder = joblib.load(
    os.path.join(
        MODEL_DIR,
        "onehot_encoder.pkl"
    )
)

scaler = joblib.load(
    os.path.join(
        MODEL_DIR,
        "standard_scaler.pkl"
    )
)


# =========================================================
# FEATURE CONFIGURATION
# =========================================================

categorical_features = [
    "location",
    "employment_type",
    "industry"
]

numerical_features = [
    "description_length",
    "has_salary"
]


# =========================================================
# FEATURE NAMES FOR SHAP
# =========================================================

tfidf_features = tfidf.get_feature_names_out()

cat_features = encoder.get_feature_names_out(
    categorical_features
)

num_features = np.array(
    numerical_features
)

feature_names = np.concatenate([
    tfidf_features,
    cat_features,
    num_features
])


# =========================================================
# SHAP EXPLAINER
# =========================================================

shap_background = load_npz(
    os.path.join(
        MODEL_DIR,
        "shap_background.npz"
    )
)

explainer = shap.LinearExplainer(
    svm_model,
    shap_background
)


# =========================================================
# PREPARE FEATURES
# =========================================================

def prepare_features(job):

    combined_text = " ".join([
        job.title or "",
        job.description or "",
        job.requirements or "",
        job.company_profile or "",
        job.benefits or ""
    ])

    description_length = len(
        job.description or ""
    )

    has_salary = int(
        bool(
            (job.salary_range or "").strip()
        )
    )

    # -------------------------
    # TF-IDF
    # -------------------------

    text_data = tfidf.transform([
        combined_text
    ])


    # -------------------------
    # CATEGORICAL FEATURES
    # -------------------------

    categorical_data = encoder.transform(
        pd.DataFrame(
            [[
                job.location or "",
                job.employment_type or "",
                job.industry or ""
            ]],
            columns=categorical_features
        )
    )


    # -------------------------
    # NUMERICAL FEATURES
    # -------------------------

    numerical_data = scaler.transform(
        pd.DataFrame(
            [[
                description_length,
                has_salary
            ]],
            columns=numerical_features
        )
    )


    # -------------------------
    # COMBINE FEATURES
    # -------------------------

    final_features = hstack([
        text_data,
        categorical_data,
        numerical_data
    ]).tocsr()


    return final_features


# =========================================================
# SHAP EXPLANATION
# =========================================================

def explain_prediction(
    features,
    top_n=10
):

    shap_values = explainer.shap_values(
        features
    )

    shap_values = np.asarray(
        shap_values
    ).reshape(-1)

    absolute_values = np.abs(
        shap_values
    )

    top_indices = np.argsort(
        absolute_values
    )[::-1][:top_n]


    explanation = []


    for index in top_indices:

        value = float(
            shap_values[index]
        )

        if value > 0:
            direction = "Potentially Fake"
        else:
            direction = "Genuine"


        explanation.append({
            "feature": str(
                feature_names[index]
            ),
            "impact": value,
            "direction": direction
        })


    return explanation


# =========================================================
# PREDICTION
# =========================================================

def predict_job(job):

    features = prepare_features(
        job
    )


    prediction = svm_model.predict(
        features
    )[0]


    decision_score = (
        svm_model
        .decision_function(features)[0]
    )


    if prediction == 1:
        label = "Potentially Fake"
    else:
        label = "Genuine"


    explanation = explain_prediction(
        features,
        top_n=10
    )


    return {
        "prediction": int(
            prediction
        ),
        "label": label,
        "decision_score": float(
            decision_score
        ),
        "explanation": explanation
    }