from fastapi import APIRouter
from fastapi import Depends
from fastapi import FastAPI
from fastapi import Query
from fastapi import status
from sqlalchemy.orm.session import Session

from app.config.settings import settings
from app.controller import employee
from app.model.database import get_db

# INPUT
from app.schema.input.employee import BaseEmployee

# OUTPUT
from app.schema.output.employee import BaseModelEmployee


def init_app(app: FastAPI):
    router = APIRouter()

    @router.post(
        "/employees",
        response_model=BaseModelEmployee,
        status_code=status.HTTP_201_CREATED,
    )
    async def post_employees(empl: BaseEmployee, db: Session = Depends(get_db)):
        return employee.insert_employee(empl=empl, db=db)

    @router.get("/employees/{id}", response_model=BaseModelEmployee)
    async def get_employees(id: int, db: Session = Depends(get_db)):
        return employee.select_employee_by_id(id=id, db=db)

    app.include_router(router=router, prefix=settings.api_v1, tags=["Employee"])
