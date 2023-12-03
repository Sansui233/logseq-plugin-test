export const style = `
.pomodoro-timer-btn {
   border: 1px solid var(--ls-border-color); 
   white-space: initial; 
   padding: 2px 4px; 
   border-radius: 4px; 
   user-select: none;
   cursor: default;
   display: flex;
   align-content: center;
}

.pomodoro-timer-btn.is-start:hover {
  opacity: .8;
}

.pomodoro-timer-btn.is-start:active {
  opacity: .6;
}

.pomodoro-timer-btn.is-start {
  padding: 3px 6px;
  cursor: pointer;
}

.pomodoro-timer-btn.is-pending {
  padding-left: 6px;
  width: 84px;
  background-color: #f6dbdb;
  border-color: #edbdbd;
  color: #cd3838;
}

.pomodoro-timer-btn.is-done {
  width: auto;
  background-color: #defcf0;
  border-color: #9ddbc7;
  color: #0F9960;
}
`