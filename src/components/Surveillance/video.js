export default class VideoPlugin {
  constructor ({ id, width, height, onInit }) {
    this.id = id
    this.width = width
    this.height = height
    this.initCount = 0
    this.pubKey = ''
    this.oWebControl = null
    this.$el = $(`#${this.id}`)
    this.onInit = typeof onInit === 'function' ? onInit : () => {}
    this.config = {
      appkey: '25026871',             //综合安防管理平台提供的appkey，必填
      secret: 'NlU2CU2a6JVxdwkHFbn4', //综合安防管理平台提供的secret，必填
      ip: '222.178.152.37',           //综合安防管理平台IP地址，必填
      playMode: 0,                    //初始播放模式：0-预览，1-回放
      port: 442,                      //综合安防管理平台端口，若启用HTTPS协议，默认443
      snapDir: 'D:\\SnapDir',         //抓图存储路径
      videoDir: 'D:\\VideoDir',       //紧急录像或录像剪辑存储路径
      layout: '1x1',                  //playMode指定模式的布局
      enableHTTPS: 1,                 //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
      encryptedFields: 'secret',      //加密字段，默认加密领域为secret
      showToolbar: 1,                 //是否显示工具栏，0-不显示，非0-显示
      showSmart: 1,                   //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
      buttonIDs: '0,16,256,257,258,259,260,512,513,514,515,516,517,768,769'  //自定义工具条按钮
    }
  }

  // 创建播放实例
  initPlugin () {
    this.oWebControl = new WebControl({
      szPluginContainer: this.id,                       // 指定容器id
      iServicePortStart: 15900,                         // 指定起止端口号，建议使用该值
      iServicePortEnd: 15909,
      szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11',   // 用于IE10使用ActiveX的clsid
      cbConnectSuccess: () => this.cbConnectSuccess(),
      cbConnectError: () => this.cbConnectError(),
      cbConnectClose: () => this.cbConnectClose()
    })
  }

  // 创建WebControl实例成功
  cbConnectSuccess () {
    this.oWebControl.JS_StartService('window', {        // WebControl实例创建成功后需要启动服务
      dllPath: './VideoPluginConnect.dll'               // 值"./VideoPluginConnect.dll"写死
    }).then(() => {                                     // 启动插件服务成功
      this.oWebControl.JS_SetWindowControlCallback({    // 设置消息回调
        cbIntegrationCallBack: this.cbIntegrationCallBack
      })
      this.oWebControl.JS_CreateWnd(this.id, this.width, this.height).then(() => {
        //JS_CreateWnd创建视频播放窗口，宽高可设定
        // 创建播放实例成功后初始化
        this.getPubKey()
      })
    }, () => {
      // 启动插件服务失败
    })
  }

  // 创建WebControl实例失败
  cbConnectError () {
    this.oWebControl = null
    this.$el.html('插件未启动，正在尝试启动，请稍候...')
    WebControl.JS_WakeUp('VideoWebPlugin://') // 程序未启动时执行error函数，采用wakeup来启动程序
    this.initCount++
    if (this.initCount < 3) {
      setTimeout(() => this.initPlugin(), 3000)
    } else {
      this.$el.html('插件启动失败，请检查插件是否安装！')
    }
  }

  cbConnectClose (bNormalClose) {
    // 异常断开：bNormalClose = false
    // JS_Disconnect正常断开：bNormalClose = true
    this.oWebControl = null
  }

  // 推送消息
  cbIntegrationCallBack (oData) {
    // showCBInfo(JSON.stringify(oData.responseMsg))
  }

  //获取公钥
  getPubKey () {
    this.oWebControl.JS_RequestInterface({
      funcName: 'getRSAPubKey',
      argument: JSON.stringify({
        keyLength: 1024
      })
    }).then((oData) => {
      if (oData.responseMsg.data) {
        this.pubKey = oData.responseMsg.data
        this.init()
      }
    })
  }

  //初始化
  init () {
    const secret = this.setEncrypt(this.config.secret)
    this.oWebControl.JS_RequestInterface({
      funcName: 'init',
      argument: JSON.stringify({ ...this.config, secret })
    }).then((oData) => {
      this.oWebControl.JS_Resize(this.width, this.height)                 // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
      $(window).resize(() => this.resize()).scroll(() => this.resize())   // 窗口大小改变或滚动的时候，重置播放器样式
      this.onInit()
    })
  }

  //RSA加密
  setEncrypt (value) {
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(this.pubKey)
    return encrypt.encrypt(value)
  }

  resize () {
    if (this.oWebControl != null) {
      this.oWebControl.JS_Resize(this.width, this.height)
      this.setWndCover()
    }
  }

  // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
  setWndCover () {
    let iWidth = $(window).width()
    let iHeight = $(window).height()
    let oDivRect = this.$el.get(0).getBoundingClientRect()

    let iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left) : 0
    let iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top) : 0
    let iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0
    let iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0

    iCoverLeft = (iCoverLeft > this.width) ? this.width : iCoverLeft
    iCoverTop = (iCoverTop > this.height) ? this.height : iCoverTop
    iCoverRight = (iCoverRight > this.width) ? this.width : iCoverRight
    iCoverBottom = (iCoverBottom > this.height) ? this.height : iCoverBottom

    this.oWebControl.JS_RepairPartWindow(0, 0, this.width + 1, this.height)    // 多1个像素点防止还原后边界缺失一个像素条
    if (iCoverLeft !== 0) {
      this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.height)
    }
    if (iCoverTop !== 0) {
      this.oWebControl.JS_CuttingPartWindow(0, 0, this.width + 1, iCoverTop)    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
    }
    if (iCoverRight !== 0) {
      this.oWebControl.JS_CuttingPartWindow(this.width - iCoverRight, 0, iCoverRight, this.height)
    }
    if (iCoverBottom !== 0) {
      this.oWebControl.JS_CuttingPartWindow(0, this.height - iCoverBottom, this.width, iCoverBottom)
    }
  }

  //视频预览功能
  startPreview (cameraIndexCode) {
    let streamMode = 0  //主子码流标识：0-主码流，1-子码流
    let transMode = 1   //传输协议：0-UDP，1-TCP
    let gpuMode = 0     //是否启用GPU硬解，0-不启用，1-启用
    let wndId = -1      //播放窗口序号（在2x2以上布局下可指定播放窗口）

    cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, '')
    cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, '')
    this.oWebControl.JS_RequestInterface({
      funcName: 'startPreview',
      argument: JSON.stringify({
        cameraIndexCode: cameraIndexCode, //监控点编号
        streamMode: streamMode,           //主子码流标识
        transMode: transMode,             //传输协议
        gpuMode: gpuMode,                 //是否开启GPU硬解
        wndId: wndId                      //可指定播放窗口
      })
    })
  }

  //停止全部预览
  stopAllPreview () {
    this.oWebControl.JS_RequestInterface({
      funcName: 'stopAllPreview'
    })
  }

  // 标签关闭
  close () {
    if (this.oWebControl !== null) {
      this.oWebControl.JS_HideWnd()   // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
      this.oWebControl.JS_Disconnect().then((res) => {  // 断开与插件服务连接成功

      }, () => {  // 断开与插件服务连接失败

      })
    }
  }

  static createVideoId () {
    const time = new Date().getTime().toString()
    const rand = Math.random().toString().replace('0.', '-')
    return 'video-' + time + rand
  }
}
