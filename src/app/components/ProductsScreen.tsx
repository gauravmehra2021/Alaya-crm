import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: 'Package' | 'Product';
  price: number;
  description: string;
  active: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'FUE Hair Transplant - Basic',
    type: 'Package',
    price: 15000,
    description: 'Basic FUE procedure with 2000-3000 grafts',
    active: true,
  },
  {
    id: '2',
    name: 'FUE Hair Transplant - Premium',
    type: 'Package',
    price: 25000,
    description: 'Premium FUE procedure with 4000-5000 grafts including PRP therapy',
    active: true,
  },
  {
    id: '3',
    name: 'DHI Hair Transplant',
    type: 'Package',
    price: 30000,
    description: 'Direct Hair Implantation with Choi Pen technique',
    active: true,
  },
  {
    id: '4',
    name: 'PRP Therapy Session',
    type: 'Product',
    price: 1500,
    description: 'Platelet-Rich Plasma treatment for hair growth',
    active: true,
  },
  {
    id: '5',
    name: 'Hair Growth Serum',
    type: 'Product',
    price: 350,
    description: 'Medical-grade hair growth serum (3-month supply)',
    active: true,
  },
  {
    id: '6',
    name: 'Post-Transplant Care Kit',
    type: 'Product',
    price: 500,
    description: 'Complete aftercare kit with shampoo, lotion, and medications',
    active: true,
  },
];

interface ProductsScreenProps {
  userRole: string;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ userRole }) => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'active'>>({
    name: '',
    type: 'Product',
    price: 0,
    description: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert('Please fill in all fields');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      active: true,
    };

    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', type: 'Product', price: 0, description: '' });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const canEdit = userRole === 'Admin' || userRole === 'Manager';

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl text-foreground mb-1">Products & Services</h1>
          <p className="text-sm text-muted-foreground">Manage your clinic offerings and pricing</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4 md:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products and services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Types</option>
            <option value="Package">Packages</option>
            <option value="Product">Products</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-background border border-border rounded-xl p-4 md:p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    product.type === 'Package'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}
                >
                  {product.type}
                </span>
              </div>
              <div className="mb-3">
                <h3 className="text-sm text-foreground mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
              <div className="mb-3 pb-3 border-b border-border">
                <div className="text-lg text-primary">AED {product.price.toLocaleString()}</div>
              </div>
              {canEdit && (
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {userRole === 'Admin' && (
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No products or services found
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl text-foreground">Add Product/Service</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Type</label>
                <select
                  value={newProduct.type}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, type: e.target.value as Product['type'] })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Package">Package</option>
                  <option value="Product">Product</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Price (AED)</label>
                <input
                  type="number"
                  value={newProduct.price || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
                  placeholder="Enter description"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
