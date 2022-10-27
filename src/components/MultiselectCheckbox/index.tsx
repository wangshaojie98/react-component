import React, { useState } from 'react'

type Options = { label: string, checked?: boolean }[]
const MultiselectCheckbox: React.FC<{ options: Options, onChange: (data: Options) => void }> = ({ options, onChange }) => {
  const [state, setState] = useState(options)

  const handleChange = (index: number) => {
    const res = [...state]
    res.splice(index, 1, {
      ...res[index],
      checked: !res[index].checked
    })

    onChange(res)
    setState(res)
  }
  return (
    <div>
      {
        state.map((it, idx) => {
          return (
            <label key={it.label}>
              <input
                readOnly
                type="checkbox"
                checked={it.checked || false}
                onClick={() => { handleChange(idx) }}
              />
              {it.label}
            </label>
          )
        })
      }
    </div>
  )
}

export default MultiselectCheckbox

const MultiselectCheckbox1: React.FC<{ options: Options, onChange: (data: Options) => void }> = ({ options, onChange }) => {
  const [state, setState] = useState(options)

  const toggle = (index: number) => {
    const res = [...state]
    res.splice(index, 1, {
      ...res[index],
      checked: !res[index].checked
    })

    onChange(res)
    setState(res)
  }
  return (
    <div>
      {
        state.map((it, idx) => {
          return (
            <label key={it.label}>
              <input
                readOnly
                type="checkbox"
                checked={it.checked || false}
                onClick={() => { toggle(idx) }}
              />
              {it.label}
            </label>
          )
        })
      }
    </div>
  )
}
/**
 * 切换术语尽量使用：toogle
 * 回传参数使用如果无输入值，使用下标
 */