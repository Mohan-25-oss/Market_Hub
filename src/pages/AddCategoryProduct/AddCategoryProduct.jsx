import { useEffect, useState } from "react";

function AddCategoryProduct() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // Load Categories
    useEffect(() => {
        fetch(`http://localhost:5000/categories`)
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    // Add Product inside Category
    const addProduct = () => {
        fetch(`http://localhost:5000/categories/${selectedCategory}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price }),
        })
            .then(res => res.json())
            .then(() => {
                // Reload categories after update
                fetch(`http://localhost:5000/categories`)
                    .then(res => res.json())
                    .then(data => setCategories(data));
            });
    };

    // Delete Product
    const deleteProduct = (categoryId, productId) => {
        fetch(`http://localhost:5000/categories/${categoryId}/products/${productId}`, {
            method: "DELETE",
        })
            .then(() => {
                fetch("http://localhost:5000/categories")
                    .then(res => res.json())
                    .then(data => setCategories(data));
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Categories & Products</h1>

            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                <option>Select Category</option>
                {categories.map((c) => (
                    <option value={c._id} key={c._id}>{c.categoryName}</option>
                ))}
            </select>
            <br /><br />

            <input
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={addProduct}>Add Product</button>

            <hr />

            {categories.map((cat) => (
                <div key={cat._id}>
                    <h2>{cat.categoryName}</h2>
                    <ul>
                        {cat.products.map((p) => (
                            <li key={p._id}>
                                {p.name} - ${p.price}
                                <button onClick={() => deleteProduct(cat._id, p._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    );
}

export default AddCategoryProduct;