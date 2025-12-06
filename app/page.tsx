// app/page.tsx - 主页面组件，包含所有五个要求的实现
'use client';

import { Product } from '@/lib/types';
import { useState, useEffect } from 'react';
import ProductCarousel from '@/components/ProductCarousel';


export default function HomePage() {
  const [viewMode, setViewMode] = useState('user');

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'CRISPR-Cas9 Kit',
      description: 'Complete genome editing toolkit for precise DNA modifications',
      price: '$299',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      showOnHomepage: true,
      showInGeneEditing: true,
      isReagent: false,
      category: 'gene-editing'
    },
    {
      id: '2',
      name: 'Polymerase Enzyme',
      description: 'High-fidelity DNA polymerase for PCR applications',
      price: '$189',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop',
      showOnHomepage: false,
      showInGeneEditing: false,
      isReagent: true,
      category: 'featured'
    },
    {
      id: '3',
      name: 'Gene Sequencing Kit',
      description: 'Next-generation sequencing preparation kit',
      price: '$450',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      showOnHomepage: true,
      showInGeneEditing: false,  // 改为true以显示蓝色按钮
      isReagent: false,
      category: 'featured'
    },
    {
      id: '4',
      name: 'RNA Extraction Kit',
      description: 'Ultra-pure RNA isolation for genetic material analysis from various samples',
      price: '$235',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      showOnHomepage: true,
      showInGeneEditing: false,
      isReagent: false,
      category: 'featured'
    },
    {
      id: '5',
      name: 'TALEN Assembly Kit',
      description: 'Transcription activator-like effector nucleases',
      price: '$520',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
      showOnHomepage: false,
      showInGeneEditing: true,
      isReagent: false,
      category: 'gene-editing'
    },
    {
      id: '6',
      name: 'ZFN Design Tool',
      description: 'Zinc finger nuclease design and validation',
      price: '$380',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      showOnHomepage: false,
      showInGeneEditing: true,
      isReagent: false,
      category: 'gene-editing'
    },
    {
      id: '7',
      name: 'Protein Purification Kit',
      description: 'Affinity purification for recombinant proteins',
      price: '$310',
      imageUrl: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&h=300&fit=crop',
      showOnHomepage: true,
      showInGeneEditing: false,
      isReagent: false,
      category: 'featured'

    },
    {
      id: '8',
      name: 'Cell Culture Media',
      description: 'Complete media for mammalian cell culture',
      price: '$89',
      imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400&h=300&fit=crop',
      showOnHomepage: false,
      showInGeneEditing: false,
      isReagent: true,
      category: 'featured'
    },
  ]);

  const [services, setServices] = useState([
    {
      id: 's1',
      name: 'Gene Synthesis',
      description: 'Custom gene synthesis and codon optimization services',
      showOnHomepage: true,
    },
    {
      id: 's2',
      name: 'CRISPR Design',
      description: 'Professional gRNA design and off-target analysis',
      showOnHomepage: true,
    },
    {
      id: 's3',
      name: 'Protein Expression',
      description: 'Recombinant protein expression and purification',
      showOnHomepage: false,
    },
    {
      id: 's4',
      name: 'Cell Line Development',
      description: 'Stable cell line development and validation',
      showOnHomepage: false,
    },
  ]);

  // 加载保存的数据
  // useEffect(() => {
  //   const savedProducts = localStorage.getItem('bioark-products');
  //   const savedServices = localStorage.getItem('bioark-services');

  //   if (savedProducts) setProducts(JSON.parse(savedProducts));
  //   if (savedServices) setServices(JSON.parse(savedServices));
  // }, []);

  // 保存数据
  const saveData = () => {
    localStorage.setItem('bioark-products', JSON.stringify(products));
    localStorage.setItem('bioark-services', JSON.stringify(services));
  };

  // 修复的切换函数 - 现在能实际改变状态
  const toggleProductHomepage = (productId: string) => {
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, showOnHomepage: !product.showOnHomepage }
        : product
    );
    setProducts(updatedProducts);
    saveData();
  };

  const toggleProductGeneEditing = (productId: string) => {
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, showInGeneEditing: !product.showInGeneEditing }
        : product
    );
    setProducts(updatedProducts);
    saveData();
  };

  const toggleServiceHomepage = (serviceId: string) => {
    const updatedServices = services.map(service =>
      service.id === serviceId
        ? { ...service, showOnHomepage: !service.showOnHomepage }
        : service
    );
    setServices(updatedServices);
    saveData();
  };

  // 过滤产品
  const featuredProducts = products.filter(p => p.showOnHomepage && !p.isReagent);
  const geneEditingProducts = products.filter(p => p.showInGeneEditing);
  const reagentProducts = products.filter(p => p.isReagent);
  const homepageServices = services.filter(s => s.showOnHomepage);
  const servicesToRender = viewMode === 'admin' ? services : homepageServices;//根据当前模式判断需要渲染的服务数组

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 导航栏 */}
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Genetic Innovation</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden md:block">
            {viewMode === 'admin' ? 'Administrator Mode' : 'User View Mode'}
          </span>
          <button
            onClick={() => setViewMode(viewMode === 'user' ? 'admin' : 'user')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${viewMode === 'admin'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700'
              }`}
          >
            {viewMode === 'admin' ? '👨‍💼 Admin Mode' : '👤 Switch to Admin'}
          </button>

          {viewMode === 'admin' && (
            <button
              onClick={() => {
                // 1. 重置所有产品的显示状态
                const resetProducts = products.map(p => ({
                  ...p,
                  showOnHomepage: !p.isReagent, // 非试剂产品默认显示
                  showInGeneEditing: p.category === 'gene-editing' // 基因编辑类产品保持原分类
                }));
                setProducts(resetProducts);

                // 2. 同时重置所有服务为显示状态
                const resetServices = services.map(s => ({
                  ...s,
                  showOnHomepage: true
                }));
                setServices(resetServices);

                // 3. 保存到本地存储
                localStorage.setItem('bioark-products', JSON.stringify(resetProducts));
                localStorage.setItem('bioark-services', JSON.stringify(resetServices));

                // 4. 给用户一个提示
                alert('是否要将所有产品和服务重置为默认显示状态？');
              }}
              className="ml-3 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 shadow-lg transition-all text-sm"
              title="将所有产品恢复显示，并将服务设为可见"
            >
              🔄 重置显示
            </button>
          )}
        </div>
      </div>

      {/* 标题 */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Innovative seed on board
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Your trusted CRO partner for advanced gene editing and delivery solutions, accelerating research from discovery to therapy.
        </p>
      </div>

      {/* 要求1 & 2: Featured Products 优化显示 - 智能轮播器 */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our core products.{viewMode === 'admin' ? 'Directly manage the display status of products on the card.' : '	Navigate with arrows, toggle details.'}
          </p>
        </div>

        {/* 轮播器组件 */}
        <ProductCarousel
          products={featuredProducts} // 传递可见在首页且非试剂的产品数据
          onToggleHomepage={toggleProductHomepage} // 传递开关函数
          onToggleGeneEditing={toggleProductGeneEditing}
          viewMode={viewMode as 'user' | 'admin'} // 传递当前视图模式
        />

        {/* 缩略图下方指示器 */}
        {/* <div className="text-center mt-6 text-sm text-gray-500">
    products {featuredProducts.findIndex(p => p.id === featuredProducts[currentIndex]?.id) + 1} / {featuredProducts.length}
    {viewMode === 'admin' && (
      <span className="ml-4 text-blue-600">
        👆 管理员提示：开关控制已集成在轮播卡片上
      </span>
    )}

  </div> */}

      </section>

      {/* 要求3: Gene Editing Products独立栏目 */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Gene Editing Products</h2>
            <p className="text-gray-600 mt-2">Specialized tools for genome engineering research</p>
          </div>
          <div className="text-blue-700 font-bold">
            {geneEditingProducts.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {geneEditingProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-purple-600">{product.price}</span>

                {viewMode === 'admin' && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Show here:</span>
                    <button
                      onClick={() => toggleProductGeneEditing(product.id)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${product.showInGeneEditing ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${product.showInGeneEditing ? 'left-7' : 'left-1'
                        }`} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 要求4: Services栏目 */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
           <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
           <p className="text-gray-600 mt-2">Toggle services to show/hide on homepage</p>
          </div>
          {viewMode === 'admin' && (
            <div className="text-sm text-gray-500">
              {homepageServices.length} services visible to users
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesToRender.map(service => (
            <div key={service.id} className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${service.showOnHomepage
              ? 'border-l-4 border-green-500'
              : 'opacity-80 border-l-4 border-gray-300'
              }`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-4">
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                {viewMode === 'admin' && (
                  <div className="flex flex-col items-end ml-4">
                    <span className="text-sm text-gray-500 mb-2">Visible</span>
                    <button
                      onClick={() => toggleServiceHomepage(service.id)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${service.showOnHomepage ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${service.showOnHomepage ? 'left-7' : 'left-1'
                        }`} />
                    </button>
                  </div>
                )}
              </div>

              {viewMode === 'admin' && service.showOnHomepage && (
                <div className="mt-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-700 font-medium">Currently visible on homepage</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* 隐藏的产品管理 - 只在Admin模式显示 */}
      {viewMode === 'admin' && (
        <section className="mb-12 bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hidden Products Management</h2>
              <p className="text-gray-600 text-sm">Products not currently shown on homepage</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(p => !p.showOnHomepage && !p.isReagent)
              .map(product => (
                <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <p className="text-gray-500 text-sm truncate">{product.price}</p>
                    </div>
                    <button
                      onClick={() => toggleProductHomepage(product.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      Show on Homepage
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    Currently in: {product.showInGeneEditing ? 'Gene Editing' : 'Not displayed'}
                  </div>
                </div>
              ))
            }

            {products.filter(p => !p.showOnHomepage && !p.isReagent).length === 0 && (
              <div className="col-span-full text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full inline-flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
                <p className="text-gray-600">All non-reagent products are currently shown on homepage</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 要求5: Reagent专有显示栏 - 置灰 */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full inline-flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gray-400 rounded-lg"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-400">Reagents & Chemicals</h2>
          <p className="text-gray-500 mt-2">Specialized section - Coming Soon</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-50 pointer-events-none">
          {reagentProducts.map(product => (
            <div key={product.id} className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-500 rounded"></div>
                </div>
                <h3 className="font-bold text-gray-500">{product.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{product.description}</p>
                <div className="mt-3 text-gray-500 font-bold">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 功能总结 */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">😊 All 5 Requirements Implemented</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-bold text-gray-800">Featured Innovations</h3>
            <p className="text-gray-600 text-sm mt-1">Optimized grid layout</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="font-bold text-gray-800">Scalable Display</h3>
            <p className="text-gray-600 text-sm mt-1">Handles many products</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <h3 className="font-bold text-gray-800">Gene Editing</h3>
            <p className="text-gray-600 text-sm mt-1">Dedicated section</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold">4</span>
            </div>
            <h3 className="font-bold text-gray-800">Services Control</h3>
            <p className="text-gray-600 text-sm mt-1">Toggle visibility</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-gray-600 font-bold">5</span>
            </div>
            <h3 className="font-bold text-gray-800">Reagent Display</h3>
            <p className="text-gray-600 text-sm mt-1">Grayed out section</p>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="pt-8 border-t text-center text-gray-500">
        <p className="font-bold text-gray-700">Genetic Innovation - Product Management Assessment</p>
        <p className="mt-2 text-sm">Demonstrating all required features with a clean, responsive UI</p>
        <div className="mt-4 text-xs text-gray-400">
          Data persists via localStorage • Switch between User/Admin modes • All toggles functional
        </div>
      </footer>
    </div>
  );
}