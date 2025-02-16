const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')
const title = document.querySelector('h1')
const buttons = document.querySelector('.buttons')
const iconElement = document.querySelector('.icon')
const toggleBtn = document.getElementById('toggleInput')
const nameInput = document.getElementById('nameInput')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let clickCount = 0
let isInputVisible = true
let currentMoveUpDistance = 0

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

// 设置画布大小
function setCanvasSize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
setCanvasSize()
window.addEventListener('resize', setCanvasSize)

// 树的配置
const config = {
  startX: window.innerWidth / 2,
  startY: window.innerHeight - 50, // 距离底部50px
  length: 8,
  angle: Math.PI / 2,
  branchWidth: 8,
  color: '#e8578d',
  generation: 10,
}

// 当窗口大小改变时更新树的起始位置
window.addEventListener('resize', () => {
  config.startX = window.innerWidth / 2
  config.startY = window.innerHeight - 50
})

// 绘制树枝
function drawBranch(x, y, length, angle, width, generation) {
  if (generation <= 0) return

  // 计算树枝长度，根据屏幕高度调整
  const screenHeight = window.innerHeight
  const scaleFactor = Math.min(screenHeight / 1000, 1) // 根据屏幕高度计算缩放因子
  const branchLength = length * 8 * scaleFactor

  const endX = x - Math.cos(angle) * branchLength
  const endY = y - Math.sin(angle) * branchLength

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = config.color
  ctx.lineWidth = width
  ctx.stroke()

  setTimeout(() => {
    drawBranch(
      endX,
      endY,
      length * 0.8,
      angle - 0.3,
      width * 0.7,
      generation - 1
    )
    drawBranch(
      endX,
      endY,
      length * 0.8,
      angle + 0.3,
      width * 0.7,
      generation - 1
    )
  }, 50)
}

noBtn.addEventListener('click', () => {
  clickCount++

  // 移除之前的所有放大类和位移类
  for (let i = 1; i <= clickCount; i++) {
    yesBtn.classList.remove(`bigger-${i}`)
    noBtn.classList.remove(`move-right-${i}`)
  }

  // 计算放大比例
  const scale = 1 + clickCount * 0.2
  const isMobile = window.innerWidth <= 480

  // 计算移动距离
  let moveDistance
  if (isMobile) {
    const baseDistance = 20
    moveDistance = baseDistance * clickCount
  } else {
    moveDistance = (scale - 1) * 120
  }

  // 获取图片和标题的位置信息
  const iconRect = iconElement.getBoundingClientRect()
  const titleRect = title.getBoundingClientRect()

  // 计算新的向上移动增量
  const moveUpIncrement = 15
  const newMoveUpDistance = currentMoveUpDistance + moveUpIncrement

  // 检查移动后是否会超出视口顶部
  const iconTopAfterMove = iconRect.top - moveUpIncrement
  const titleTopAfterMove = titleRect.top - moveUpIncrement

  // 如果移动后不会超出视口顶部，则更新移动距离
  if (iconTopAfterMove >= 20 && titleTopAfterMove >= 20) {
    currentMoveUpDistance = newMoveUpDistance
  }

  // 为每次点击添加新的放大和位移类
  yesBtn.style.transform = `scale(${scale})`

  // 根据设备类型决定移动方向
  if (isMobile) {
    noBtn.style.transform = `translateY(${moveDistance}px)`
  } else {
    noBtn.style.transform = `translateX(${moveDistance}px)`
  }

  // 应用当前的移动距离
  iconElement.style.transform = `translateY(-${currentMoveUpDistance}px)`
  title.style.transform = `translateY(-${currentMoveUpDistance}px)`

  // 获取当前状态的文本和图标
  const currentState = buttonTexts[Math.min(clickCount - 1, 5)]
  noBtn.textContent = currentState?.text ? currentState?.text : '不行'

  // 更新顶部图标
  iconElement.innerHTML = `<img src="${currentState.icon}" style="width: 150px; height: 150px; object-fit: cover;">`
})

toggleBtn.addEventListener('click', () => {
  const nameInputDiv = document.querySelector('.name-input')

  if (isInputVisible) {
    nameInputDiv.classList.add('show')
    toggleBtn.textContent = '👁️'
  } else {
    nameInputDiv.classList.remove('show')
    toggleBtn.textContent = '👀'
  }
  isInputVisible = !isInputVisible
})

yesBtn.addEventListener('click', () => {
  const name = nameInput.value.trim() || 'XXX'
  title.textContent = `喜欢你 ${name}！❤️`
  buttons.style.display = 'none'
  document.querySelector('.name-input').style.display = 'none'
  toggleBtn.style.display = 'none'

  // 清除画布并开始绘制爱情树
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBranch(
    config.startX,
    config.startY,
    config.length,
    config.angle,
    config.branchWidth,
    config.generation
  )

  // 点击"可以"后显示开心的图片
  iconElement.innerHTML =
    '<img src="https://img0.baidu.com/it/u=1992702231,2494848796&fm=253&fmt=auto&app=120&f=JPEG?w=803&h=800" style="width: 150px; height: 150px; object-fit: cover;">'

  // 重置图标和标题的位置
  iconElement.style.transform = 'none'
  title.style.transform = 'none'
})
