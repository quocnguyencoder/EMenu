import { List } from '@material-ui/core'
import { Menu } from '../../models/place'
import MenuItem from './MenuItem'

interface Props {
  categories: string[]
  filteredCategories: string[]
  menu: Menu[]
  setSelected: (selected: number) => void
}

const MainMenu = ({
  categories,
  filteredCategories,
  menu,
  setSelected,
}: Props) => {
  return (
    <List>
      {categories.map(
        (category, index) =>
          filteredCategories.includes(category) && (
            <MenuItem
              index={index}
              category={category}
              menu={menu}
              key={`${index}-${category}`}
              setSelected={setSelected}
            />
          )
      )}
    </List>
  )
}

export default MainMenu
