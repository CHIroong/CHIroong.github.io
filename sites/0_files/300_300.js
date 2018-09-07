'use strict';
(function () {
    var nid = (/(?:idxno=)(\w+)/.exec(window.location.href) || ['', ''])[1];
    document.write(['<script src="//cm.interworksmedia.co.kr/adTagRequest.htm?mediaId=sisain&newsId=', nid, '&site=www.sisainlive.popup&page=sisain_news&position=x21&tagId=JX">\x3c/script>'].join(''));
})();
