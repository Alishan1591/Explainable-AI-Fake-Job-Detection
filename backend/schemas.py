from pydantic import BaseModel
from pydantic import BaseModel, EmailStr


class JobPostingRequest(BaseModel):
    title: str
    description: str
    requirements: str = ""
    company_profile: str = ""
    benefits: str = ""
    location: str = ""
    employment_type: str = ""
    industry: str = ""
    salary_range: str = ""


class UserRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str