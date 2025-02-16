const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')
const title = document.querySelector('h1')
const buttons = document.querySelector('.buttons')
const iconElement = document.querySelector('.icon')
let clickCount = 0

const buttonTexts = [
  {
    text: '你认真的吗？',
    icon: 'https://img2.baidu.com/it/u=3609191454,1487035543&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=865',
  }, // 第一次点击
  {
    text: '要不再想想？',
    icon: 'https://img1.baidu.com/it/u=1098730719,3393382426&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
  }, // 第二次点击
  {
    text: '不许选这个！',
    icon: 'https://img2.baidu.com/it/u=3271440465,904219580&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
  }, // 第三次点击
  {
    text: '我会很伤心的',
    icon: 'https://img2.baidu.com/it/u=3364418527,2246036048&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=668',
  }, // 第四次点击
  {
    text: '不行',
    icon: 'https://img2.baidu.com/it/u=1720671497,2969686359&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
  }, // 第五次及以后点击
]

// 修改初始图标为 img 标签
iconElement.innerHTML =
  '<img src="https://img2.baidu.com/it/u=2797246982,1861213878&fm=253&fmt=auto&app=120&f=JPEG?w=150&h=150" style="width: 150px; height: 150px; object-fit: cover;">'

noBtn.addEventListener('click', () => {
  clickCount++

  // 移除之前的所有放大类和位移类
  for (let i = 1; i <= clickCount; i++) {
    yesBtn.classList.remove(`bigger-${i}`)
    noBtn.classList.remove(`move-right-${i}`)
  }

  // 计算放大比例
  const scale = 1 + clickCount * 0.3
  // 判断是否是手机模式
  const isMobile = window.innerWidth <= 480

  // 计算移动距离
  let moveDistance
  if (isMobile) {
    // 在手机模式下，移动距离随点击次数增加
    const baseDistance = 30 // 基础移动距离
    moveDistance = baseDistance * clickCount // 每次点击都会增加基础距离
  } else {
    moveDistance = (scale - 1) * 160 // 桌面版保持原来的横向移动
  }

  // 计算向上移动的距离
  const moveUpDistance = clickCount * 20

  // 为每次点击添加新的放大和位移类
  yesBtn.style.transform = `scale(${scale})`
  // 根据设备类型决定移动方向
  if (isMobile) {
    noBtn.style.transform = `translateY(${moveDistance}px)`
  } else {
    noBtn.style.transform = `translateX(${moveDistance}px)`
  }

  // 移动图标和标题
  iconElement.style.transform = `translateY(-${moveUpDistance}px)`
  title.style.transform = `translateY(-${moveUpDistance}px)`

  // 获取当前状态的文本和图标
  const currentState = buttonTexts[Math.min(clickCount - 1, 5)]
  noBtn.textContent = currentState.text // 只显示文字

  // 更新顶部图标
  iconElement.innerHTML = `<img src="${currentState.icon}" style="width: 150px; height: 150px; object-fit: cover;">`
})

yesBtn.addEventListener('click', () => {
  const nameInput = document.getElementById('nameInput')
  const name = nameInput.value.trim() || 'XXX' // 如果没有输入名字，使用默认值

  title.textContent = `喜欢你 ${name}！❤️`
  buttons.style.display = 'none'
  nameInput.style.display = 'none' // 隐藏输入框

  // 点击"可以"后显示开心的图片
  iconElement.innerHTML =
    '<img src="https://img0.baidu.com/it/u=1992702231,2494848796&fm=253&fmt=auto&app=120&f=JPEG?w=803&h=800" style="width: 150px; height: 150px; object-fit: cover;">'
  // 重置图标和标题的位置
  iconElement.style.transform = 'none'
  title.style.transform = 'none'
})
