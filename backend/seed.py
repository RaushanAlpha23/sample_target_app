from database import engine, SessionLocal, Base
import models

def seed_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    for i in range(1, 16):
        product = models.Product(
            name=f"Demo Product {i}",
            description=f"This is a fantastic product number {i}. Buy it today!",
            image_url=f"/images/prod{i}.jpg",
            base_price=10.0 + (i * 2.50)
        )
        db.add(product)
    db.commit()

    discounts = [
        models.Discount(product_id=2, discounted_price=12.00),
        models.Discount(product_id=5, discounted_price=18.50),
        models.Discount(product_id=8, discounted_price=25.00),
    ]
    db.add_all(discounts)
    db.commit()
    db.close()
    print("Database seeded successfully with 15 products.")

if __name__ == "__main__":
    seed_db()