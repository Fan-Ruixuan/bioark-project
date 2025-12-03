// lib/types.ts
export type ProductCategory = 'featured' | 'gene-editing' | 'reagent' | 'service';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: ProductCategory;
  imageUrl: string;
  showOnHomepage: boolean;        // 是否出现在首页Featured Innovations
  showInGeneEditing: boolean;     // 是否出现在Gene Editing栏目
  showInServices?: boolean;       // 是否出现在Services栏目（对服务）
  isReagent?: boolean;            // 是否是Reagent产品
}

export interface Service {
  id: string;
  name: string;
  description: string;
  showOnHomepage: boolean;        // 是否出现在首页Services栏目
}
