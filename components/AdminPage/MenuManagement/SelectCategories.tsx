import { Box, Chip, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../models/place'

interface Props {
  selectedCategories: number[]
  handleChangeCategory: (selectedList: number[]) => void
  categories: Category
}

const SelectCategories = ({
  selectedCategories,
  handleChangeCategory,
  categories,
}: Props) => {
  return (
    <Select
      multiple
      value={selectedCategories}
      onChange={(e) => handleChangeCategory(e.target.value as number[])}
      renderValue={(selected) => (
        <Box>
          {(selected as number[]).map((value) => (
            <Chip key={`select ${value}`} label={categories[value].name} />
          ))}
        </Box>
      )}
      style={{ minWidth: '10%' }}
    >
      {Object.keys(categories).map((c) => (
        <MenuItem key={`category ${c}`} value={Number(c)}>
          {categories[Number(c)].name}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectCategories
