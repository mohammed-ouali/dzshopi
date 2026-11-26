from app.core.exceptions import DomainException


class CategoryNotFound(DomainException):
    status_code = 404
    title = "Category Not Found"
    default_message = "The requested category could not be found."


class CategoryNameAlreadyExists(DomainException):
    status_code = 409
    title = "Category Name Conflict"
    default_message = "A category with this name already exists."
