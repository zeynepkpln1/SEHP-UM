import { useProducts } from '../state/ProductsContext'
import { ProductCard } from '../components/products/ProductCard'

export function ProductsPage() {
    const { products } = useProducts()

    return (
        <div className="page">
            <div className="page-header" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="page-eyebrow" style={{ color: '#d4af37' }}>TÜM KOLEKSİYON</div>
                    <h2 className="page-title">Ürünlerimiz</h2>
                    <p className="page-subtitle" style={{ margin: '1rem auto 0' }}>
                        Evinizin her köşesi için özenle seçilmiş, doğal ve zamansız parçalar.
                    </p>
                </div>
            </div>

            <div className="grid grid-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
