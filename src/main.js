const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const xx = localStorage.getItem("xx");
const xxObject = JSON.parse(xx);

const hashMap = xxObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close"><svg class="iconClose" aria-hidden="true">
      <use xlink:href="#icon-closefill"></use>
  </svg></div>
      </div>
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(e);
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("https://") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: Text,
    url: url,
  });
  $siteList.find("li:not(.last)").remove();
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("xx", string);
};
