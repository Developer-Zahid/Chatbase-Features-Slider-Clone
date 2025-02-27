/* Utility Functions */
function matchMediaQuery(breakpointString, parameterCallback) {
    if (window.matchMedia(breakpointString).matches) {
      return parameterCallback();
    }
}

/* Swiper Slider Function */
$('[data-swiper="wrapper"]').each(function() {
    const $currentSliderWrapperElement = $(this);
    const $currentSliderElement = $(this).find('[data-swiper="Features-Slider"]');
    const $currentSliderTabsElement = $(this).find('[data-swiper="tabs"]');
    const $currentSliderTabsButtonElement = $currentSliderTabsElement.find('[data-swiper="tabs-btn"]');

    function indicatorUpdate(swiper){
        const tabsElementInfo = $currentSliderTabsElement.get(0).getBoundingClientRect();
        const activeTabButtonInfo = swiper.pagination.bullets[swiper.realIndex].getBoundingClientRect();
        $currentSliderTabsElement.css("--_indicator-width", `${activeTabButtonInfo.width}px`);
        $currentSliderTabsElement.css("--_indicator-position-left", `${activeTabButtonInfo.left - tabsElementInfo.left }px`);
    };

    new Swiper($currentSliderElement.get(0), {
        speed: 500,
        virtualTranslate: true,
        rewind: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        pagination: {
            clickable: true,
            el: $currentSliderTabsElement.get(0),
            renderBullet: (bulletIndex, className)=> {
                $currentSliderTabsButtonElement.eq(bulletIndex).addClass(className);
                return $currentSliderTabsButtonElement[bulletIndex].outerHTML;
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        on: {
            beforeInit: function (swiper) {
                swiper.params.speed = swiper.el.dataset.speed * 1 || swiper.params.speed;
                swiper.params.autoplay.delay = swiper.el.dataset.autoplayDelay * 1 || swiper.params.autoplay.delay;
                $currentSliderWrapperElement.css("--_animation-duration", `${swiper.params.speed}ms`);
            },
            init: function (swiper) {
                indicatorUpdate(swiper);
            },
            resize: function (swiper) {
                indicatorUpdate(swiper);
            },
            realIndexChange: function (swiper) {
                indicatorUpdate(swiper);
            },
        }
    });
});