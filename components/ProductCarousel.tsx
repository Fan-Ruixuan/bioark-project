// components/ProductCarousel.tsx
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';

// 定义从父组件接收的属性类型
interface ProductCarouselProps {
  products: Array<{ // 这里使用page.tsx中定义的Product类型简化版
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    showOnHomepage: boolean;
    showInGeneEditing: boolean;
    isReagent?: boolean;
  }>;
  onToggleHomepage?: (id: string) => void;
  onToggleGeneEditing?: (id: string) => void;
  viewMode?: 'user' | 'admin';
}

export default function ProductCarousel({
  products,
  onToggleHomepage,
  onToggleGeneEditing,
  viewMode = 'user'
}: ProductCarouselProps) {
  // 状态管理：当前索引、详情展开状态
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedDetailId, setExpandedDetailId] = useState<string | null>(null);
  const isAdmin = viewMode === 'admin';

  // 只显示被标记为Show on Homepage的产品
  const featuredProducts = products.filter(p => p.showOnHomepage && !p.isReagent);
  const currentProduct = featuredProducts[currentIndex];

  // 轮播导航函数
  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? featuredProducts.length - 1 : prev - 1);
    setExpandedDetailId(null); // 切换产品时Close details面板
  };
  const goToNext = () => {
    setCurrentIndex(prev => prev === featuredProducts.length - 1 ? 0 : prev + 1);
    setExpandedDetailId(null);
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setExpandedDetailId(null);
  };

  // 处理详情面板展开/收起
  const toggleDetail = (productId: string) => {
    setExpandedDetailId(prev => prev === productId ? null : productId);
  };

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-500">No featured products to display.。</p>
        {isAdmin && <p className="text-sm text-gray-400 mt-1">请在管理模式下将产品设为“首页展示”</p>}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 轮播主区域 */}
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 左右导航箭头 */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="上一个产品"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="下一个产品"
        >
          <ChevronRight size={24} />
        </button>

        {/* 轮播内容卡片 */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            
            {/* 产品图片 */}
            <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
              <img
                src={currentProduct.imageUrl}
                alt={currentProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* 图片角标 */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold">
                {currentProduct.price}
              </div>
            </div>

            {/* 产品信息与控制区 */}
            <div className="flex flex-col flex-1">
             <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{currentProduct.name}</h3>
                <p className="text-gray-600 mt-4 text-lg">{currentProduct.description}</p>
              </div> 
            </div>

              {/* 管理员控制面板 */}
              {isAdmin && (
                <div className="mt-4 space-y-4 p-6 bg-gray-50 rounded-xl border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Show on Homepage</span>
                    <button
                      onClick={() => onToggleHomepage?.(currentProduct.id)}
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${currentProduct.showOnHomepage ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${currentProduct.showOnHomepage ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Show in Gene Editing</span>
                    <button
                      onClick={() => onToggleGeneEditing?.(currentProduct.id)}
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${currentProduct.showInGeneEditing ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${currentProduct.showInGeneEditing ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              )}

              {/* 用户操作按钮 */}
              <div className="mt-auto pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => toggleDetail(currentProduct.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
                >
                  <Eye size={20} />
                  {expandedDetailId === currentProduct.id ? 'Collapse Details' : 'View Details'}
                </button>
                {/* 可以在这里添加“立即咨询”等按钮 */}
              </div>
            </div>
          </div>
        </div>

        {/* 缩略图导航栏 */}
        <div className="px-8 pb-8">
          <div className="flex justify-center gap-3 flex-wrap">
            {featuredProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex ? 'border-blue-500 scale-105 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                aria-label={`查看 ${product.name}`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 详情展开面板 - 平滑动画 */}
      {expandedDetailId === currentProduct.id && (
        <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-inner p-6 md:p-8 border animate-fadeIn">
          <div className="flex justify-between items-start mb-6">
            <h4 className="text-2xl font-bold text-gray-900">Product Specifications</h4>
            <button
              onClick={() => setExpandedDetailId(null)}
              className="text-gray-500 hover:text-gray-700 p-2"
              aria-label="Close details"
            >
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
<div>
  <h5 className="font-semibold text-gray-800 mb-2">Key Features</h5>
  <ul className="list-disc pl-5 space-y-1 text-gray-600">
    <li>Engineered with next-generation <strong>CRISPR-Cas12d (CasY)</strong> system, achieving up to <strong>40% higher editing efficiency</strong> in mammalian cells.</li>
    <li>Exhibits an exceptionally <strong>low off-target rate (&lt;0.1%)</strong>, rigorously validated by whole-genome sequencing (WGS).</li>
    <li>Comes with comprehensive <strong>bioinformatics support</strong>, including NGS data analysis and editing outcome reports.</li>
  </ul>
</div>

<div>
  <h5 className="font-semibold text-gray-800 mb-2">Technical Specifications</h5>
  <ul className="space-y-2 text-gray-600">
    <li><span className="font-medium">Delivery Vehicle:</span> AAV, Lentivirus, Plasmid</li>
    <li><span className="font-medium">Applicable Species:</span> Human, Mouse, Plant models</li>
    <li><span className="font-medium">Standard Delivery Time:</span> 2-4 weeks</li>
  </ul>
</div>
            </div>
          </div>
          {/*（ 这里可以添加更多自定义详情，用于后续扩展 ）*/}
        </div>
      )}
    </div>
  );
}