import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from './services/categories-list-service';
import { Category } from '@/shared/types/category';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TreeModule],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.scss'],
})
export class CategoriesList {
  private business = inject(CategoriesService);
  private router = inject(Router);

  categories = toSignal(this.business.getCategoriesTree(), {
    initialValue: [],
  });
  treeNodes = computed(() => this.toTreeNodes(this.categories()));

  onNodeSelect(event: { node: TreeNode }) {
    const categoryId = event.node.key;
    this.router.navigate(['/search'], { queryParams: { c: categoryId } });
  }

  toTreeNodes(categories: Category[]): TreeNode[] {
    return categories.map((cat) => {
      const hasChildren = cat.childs && cat.childs.length > 0;

      return {
        key: cat.id,
        label: cat.name,
        data: cat,
        children: hasChildren ? this.toTreeNodes(cat.childs) : [],
      };
    });
  }
}
