import { useSelectCategory } from "@/hooks/useCategory";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Props {
  categoryFilter: string;
  handleCategoryFilter: (value: string) => void;
}

export default function TabsCategories({ categoryFilter, handleCategoryFilter }: Props) {
  const { data: categoriesSelect = [] } = useSelectCategory();
  const categoriesActive = categoriesSelect.filter(cat => cat.isActive === true);

  return (
    <Tabs
      value={categoryFilter}
      onValueChange={handleCategoryFilter}
      className="w-full mt-4"
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <TabsList className="h-auto bg-transparent p-0 gap-2 flex-nowrap" >

          {/* TODOS */}
          <TabsTrigger
            value="all"
            className="
            h-9 rounded-lg border
            px-5 text-sm font-medium
            whitespace-nowrap
            border-transparent
            bg-muted/60
            text-muted-foreground
            transition-all
            data-[state=active]:bg-primary
            data-[state=active]:text-white
            data-[state=active]:border-primary/20
            data-[state=active]:shadow-sm"
          >
            TODOS
          </TabsTrigger>

          {/* CATEGORIAS */}
          {categoriesActive.map((category) => (
            <TabsTrigger
              key={category._id}
              value={category._id}
              className="
                h-9 rounded-lg border
                px-5 text-sm font-medium
                whitespace-nowrap
                border-transparent
                bg-muted/60
                text-muted-foreground
                transition-all
                hover:bg-muted
                data-[state=active]:bg-primary
                data-[state=active]:text-white
                data-[state=active]:border-primary/20
                data-[state=active]:shadow-sm
                "
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  )
}
