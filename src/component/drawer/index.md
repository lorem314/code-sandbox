## `Drawer`

抽屉组件

### 参数

1. `position` 控制抽屉的打开方向
2. `size` 抽屉的宽度或高度。position 值为 left 或 right 时，为宽度；为 top 或 bottom 时，为高度。
3. `onClose`
   函数，其中需要包含关闭抽屉的逻辑。
4. `children`
   抽屉中的内容。

### 例子

```jsx
function Demo() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <div>
      <button onClick={open}>打开抽屉</button>
      <Drawer position="left" size={320} onClose={close}>
        <DrawerContent />
      </Drawer>
    </div>
  )
}
```

`<DrawerContent />`会接收到一个名为 `onCloseDrawer` 参数，该参数为一个函数，用于关闭抽屉。故推荐使用自定义组件作为 Drawer 的子组件。
