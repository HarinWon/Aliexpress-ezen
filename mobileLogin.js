// PC사이즈진입
function checkScreenWidth() {
  const width = window.innerWidth;
  if (width >= 430 && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
  }
}
window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

// SNS 사이트이동하게하기
const kakao = document.querySelector(".kakao");
kakao.addEventListener("click", () => {
  const targetUrl =
    "https://accounts.kakao.com/login/?continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fservice%3D53%26locale%3Dko#login";
  window.location.href = targetUrl;
});

const naver = document.querySelector(".naver");
naver.addEventListener("click", () => {
  const targetUrl = "https://nid.naver.com/nidlogin.login?svctype=262144";
  window.location.href = targetUrl;
});

const google = document.querySelector(".google");
google.addEventListener("click", () => {
  const targetUrl =
    "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F%3Fhl%3Dko&ec=GAZAmgQ&hl=ko&passive=true&ifkv=Ab5oB3r7xkxDGJ-0BKjo2B2cdCXTyvyUWkM_-pVNa5SqMjLLgLhngyqGKIBC1SypP0c8mB8l1xWa&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin";
  window.location.href = targetUrl;
});

const apple = document.querySelector(".apple");
apple.addEventListener("click", () => {
  const targetUrl =
    "https://appleid.apple.com/auth/authorize?client_id=com.alibaba.iAliexpressmsite&response_type=code%20id_token&scope=email%20name&response_mode=form_post&state=iV%2FFZnOchXPmwM5RItjn6HmubjMUMB%2FVwK3y5c1OwFs1ER8lbn1uYILSqJElhhSudo4iKihQMc2LvwkeMh1fwtq%2Fge2mJLeDVFxbOqexCQfbBW4RzjUmfJRC9z16J8mh%2BYtvmVMIRAHTq5VAkBXbol1OSC58oZnIuGepibXNolyqG%2BdFvfyYuwlHvHePOctonzPLwT4CeQo2%2BgvDg59FEg%3D%3D&redirect_uri=https%3A%2F%2Fthirdparty.aliexpress.com%2Fapplecallback.htm";
  window.location.href = targetUrl;
});
