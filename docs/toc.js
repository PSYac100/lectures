// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">강의목록</a></li><li class="chapter-item expanded "><a href="qgis/index.html"><strong aria-hidden="true">1.</strong> QGIS 활용</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="qgis/projection.html"><strong aria-hidden="true">1.1.</strong> 좌표체계 이해</a></li><li class="chapter-item expanded "><a href="qgis/obtain.html"><strong aria-hidden="true">1.2.</strong> 공간자료 취득</a></li></ol></li><li class="chapter-item expanded "><a href="db/index.html"><strong aria-hidden="true">2.</strong> 공간정보DB</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="db/README1.html"><strong aria-hidden="true">2.1.</strong> 공간데이터베이스</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="db/source1.html"><strong aria-hidden="true">2.1.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="db/quiz1.html"><strong aria-hidden="true">2.1.2.</strong> QUIZ</a></li></ol></li><li class="chapter-item expanded "><a href="db/README2.html"><strong aria-hidden="true">2.2.</strong> QGIS 활용법</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="db/source2.html"><strong aria-hidden="true">2.2.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="db/quiz2.html"><strong aria-hidden="true">2.2.2.</strong> QUIZ</a></li></ol></li><li class="chapter-item expanded "><a href="db/README3.html"><strong aria-hidden="true">2.3.</strong> 기하데이터 함수</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="db/source3.html"><strong aria-hidden="true">2.3.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="db/quiz3.html"><strong aria-hidden="true">2.3.2.</strong> QUIZ</a></li></ol></li><li class="chapter-item expanded "><a href="db/README4.html"><strong aria-hidden="true">2.4.</strong> 공간질의실습</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="db/source4.html"><strong aria-hidden="true">2.4.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="db/quiz4.html"><strong aria-hidden="true">2.4.2.</strong> QUIZ</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="web/index.html"><strong aria-hidden="true">3.</strong> 웹프로그래밍기본</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="web/README1.html"><strong aria-hidden="true">3.1.</strong> HTML</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="web/source1.html"><strong aria-hidden="true">3.1.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="web/quiz1.html"><strong aria-hidden="true">3.1.2.</strong> QUIZ</a></li></ol></li><li class="chapter-item expanded "><a href="web/README2.html"><strong aria-hidden="true">3.2.</strong> CSS</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="web/source2.html"><strong aria-hidden="true">3.2.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="web/quiz2.html"><strong aria-hidden="true">3.2.2.</strong> QUIZ</a></li></ol></li><li class="chapter-item expanded "><a href="web/README3.html"><strong aria-hidden="true">3.3.</strong> JavaScript</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="web/source3.html"><strong aria-hidden="true">3.3.1.</strong> SOURCE</a></li><li class="chapter-item expanded "><a href="web/quiz3.html"><strong aria-hidden="true">3.3.2.</strong> QUIZ</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
