from database import Base, engine
import models  # noqa: F401  (import needed so SQLAlchemy sees the table definitions)

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Done. diet_planner.db created with all tables.")