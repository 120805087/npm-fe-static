import axios from "axios";

declare global {
  interface Window {
    wx: any;
  }
}

async function initWechat() {
  const encodeUrl = encodeURI(location.href);
  try {
    // 后端请求获取签名
    const { data } = await axios.get(
      `https://wechat.kmelearning.com/web-student/public/wechat/get/signature?type=&url=${encodeUrl}&appid=wx47e30d7093fc307a&agentId=`
    );

    console.log(data, "接口请求返回");

    const { timestamp, noncestr, signnatrue } = data.data;
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "wx47e30d7093fc307a", // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: signnatrue, // 必填，签名
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表
    });

    window.wx.ready(function () {
      //需在用户可能点击分享按钮前就先调用
      window.wx.updateAppMessageShareData({
        title: "“学榜样、融助力、共攀登”上海分行社招优秀代表专访", // 分享标题
        desc: "", // 分享描述
        link: "https://wechat.kmelearning.com/jsbank/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: "https://wechat.kmelearning.com/jsbank/images/share.jpg", // 分享图标
        success: function () {
          // 设置成功
          console.log("分享给朋友");
        },
      });

      window.wx.updateTimelineShareData({
        title: "“学榜样、融助力、共攀登”上海分行社招优秀代表专访", // 分享标题
        link: "https://wechat.kmelearning.com/jsbank/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: "https://wechat.kmelearning.com/jsbank/images/share.jpg", // 分享图标
        success: function () {
          // 设置成功
          console.log("分享到朋友圈朋友");
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export { initWechat };
