const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

var vm = new Vue({
  el: '#app',
  data: {
    sdate: '2014-09-01',
    edate: new Date().toISOString().slice(0, 10),
    cookie: '点击获取 hallticket',
    cookieSuccess: false,
    cookieError: false,
    message: '',
    res: {
      cost_res: {
        costCnt: '0',
        cost: '0',
        costEle: '0',
        charge: '0',
        maxCost: '0',
        maxCharge: '0',
      },
      bf_res: {
        dateCnt: '0',
        bfCnt: '0',
        minbftime: '0',
        maxbftime: '0'
      }
    },
    showInput: true,
    showResult: false,
    showWait: false,
    showHelp: true,
    helpButton: '收起',

  },
  methods: {
    getRes: function () {
      this.message = '获取中,请稍后...';
      this.showWait = true;
      var data = {
        'sdate': this.sdate,
        'edate': this.edate,
        'cookie': this.cookie
      }
      ipcRenderer.send('fetch-data', data);
      ipcRenderer.on('fetch-success', (event, arg) => {
        if (arg && arg.code == 200) {
          this.res = arg.msg;
          this.showInput = false;
          this.showWait = false;
          this.showResult = true;
        } else {
          this.message = '获取失败';
        }
      });
    },

    retInput: function () {
      this.showResult = false;
      this.showInput = true;
      this.cookie = '点击获取 hallticket';
      this.cookieSuccess = false;
      this.cookieError = false;
    },

    toggleHelp: function () {
      this.showHelp = !this.showHelp;
      if (this.showHelp) {
        this.helpButton = '收起'
      } else {
        this.helpButton = '展开'
      }
    },

    getHt: function () {
      ipcRenderer.send('login', {});
      ipcRenderer.on('hallticket', (event, arg) => {
        if (arg && arg.code == 200) {
          this.cookie = arg.ht;
          this.cookieSuccess = true;
          this.cookieError = false;
        } else {
          this.cookie = arg.ht;
          this.cookieError = true;
          this.cookieSuccess = false;
        }
      })
    }
  }
});

