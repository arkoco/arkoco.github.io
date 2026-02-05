// 休息提醒弹窗功能
const reminderMessages = [
  "⏰ 到点了！该休息一下啦～",
  "🎯 劳逸结合，效率加倍！",
  "🌿 站起来走走，看看窗外吧！",
  "💧 记得喝口水，补充水分哦！",
  "👀 让眼睛休息一下，做个眼保健操",
  "🏃 起来活动活动，舒展一下筋骨",
  "🎵 听首歌，放松一下心情～",
  "🌞 该摸鱼的时候就摸鱼！",
  "💆 深呼吸，给自己一个微笑",
  "🍵 泡杯茶，享受片刻宁静",
  "🔄 换个姿势，换个心情",
  "🎨 创意需要休息，大脑需要放空"
];

// 创建弹窗DOM
function createReminderModal() {
  const modal = document.createElement('div');
  modal.className = 'reminder-modal';
  modal.id = 'reminderModal';
  
  const content = document.createElement('div');
  content.className = 'reminder-content';
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'reminder-close';
  closeBtn.innerHTML = '&times;';
  
  const icon = document.createElement('div');
  icon.className = 'reminder-icon';
  icon.textContent = '⏰';
  
  const message = document.createElement('div');
  message.className = 'reminder-message';
  message.id = 'reminderMessage';
  
  const timer = document.createElement('div');
  timer.className = 'reminder-timer';
  timer.innerHTML = '弹窗将在 <span class="timer-count" id="reminderTimer">60</span> 秒后自动关闭';
  
  const button = document.createElement('button');
  button.className = 'reminder-button';
  button.textContent = '好了好了我知道了';
  button.id = 'reminderCloseBtn';
  
  content.appendChild(closeBtn);
  content.appendChild(icon);
  content.appendChild(message);
  content.appendChild(timer);
  content.appendChild(button);
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // 绑定事件
  closeBtn.addEventListener('click', closeReminder);
  button.addEventListener('click', closeReminder);
  
  // 点击模态框外部关闭
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeReminder();
    }
  });
}

// 显示弹窗
function showReminder() {
  const modal = document.getElementById('reminderModal');
  const message = document.getElementById('reminderMessage');
  const timer = document.getElementById('reminderTimer');
  
  // 随机选择一条提示语
  const randomMessage = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
  message.textContent = randomMessage;
  
  // 显示弹窗
  modal.style.display = 'block';
  
  // 开始60秒倒计时
  let countdown = 60;
  timer.textContent = countdown;
  
  const countdownInterval = setInterval(() => {
    countdown--;
    timer.textContent = countdown;
    
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      closeReminder();
    }
  }, 1000);
  
  // 保存当前计时器ID以便清除
  modal.dataset.countdownId = countdownInterval;
}

// 关闭弹窗
function closeReminder() {
  const modal = document.getElementById('reminderModal');
  modal.style.display = 'none';
  
  // 清除倒计时
  if (modal.dataset.countdownId) {
    clearInterval(parseInt(modal.dataset.countdownId));
  }
}

// 检查是否是整点或半点
function checkReminderTime() {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // 在整点（0分钟）或半点（30分钟）的0秒时触发
  // 添加1秒延迟确保准确触发
  if (seconds === 0) {
    if (minutes === 0 || minutes === 35) {
      // 检查是否已经显示过（避免一分钟内重复显示）
      const lastShown = localStorage.getItem('lastReminderShown');
      const currentTime = now.getHours() * 100 + minutes; // 简化时间标识
      
      if (!lastShown || parseInt(lastShown) !== currentTime) {
        // 延迟1秒显示，让用户有心理准备
        setTimeout(showReminder, 1000);
        localStorage.setItem('lastReminderShown', currentTime);
      }
    }
  }
}

// 初始化提醒功能
function initReminder() {
  createReminderModal();
  
  // 每分钟检查一次时间
  setInterval(checkReminderTime, 1000);
  
  // 页面加载后立即检查
  checkReminderTime();
  
  // 添加键盘关闭功能（按ESC关闭）
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeReminder();
    }
  });
}

// 初始化所有功能
function initAll() {
  initCalendar();
  updateCurrentDate();
  updateCountdowns();
  calculateRemainingDays();
  calculateNextHoliday();
  setInterval(updateCountdowns, 1000);
  
  // 初始化提醒功能
  initReminder();
}

// 修改页面加载时的初始化调用
// 将原来的：
// initCalendar();
// updateCurrentDate();
// updateCountdowns();
// calculateRemainingDays();
// calculateNextHoliday();
// setInterval(updateCountdowns, 1000);

// 改为：
initAll();