## `Timer`

计时器组件。

### 参数

- `duration` 组件从 start 走到 end 所需时间。
- `start` 起始显示数值。
- `end` 结束数值。
- `step` 每步的变化值。当 start 大于 end 时，应为负数，反之为正数。
- `isTiming` 用于在外部控制计时器暂停。
- `onTimeout` 结束后的回调函数。
- `children` 为函数或为 null。为函数时，函数会接收 count 参数，为当前显示的数值；为 null 时，组件会返回当前数值。

### 示例

```jsx
<Timer duratioin={60000} start={60} end={0} step={-1} />
```

如上为一个 60 秒的倒计时。
