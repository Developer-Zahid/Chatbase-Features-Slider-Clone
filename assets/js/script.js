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
    const $currentSliderPaginationElement = $(this).find('[data-swiper="pagination"]');
    const sliderCommonOptions = {
        speed: 500,
        rewind: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    };

    function sliderCommonBeforeInit(swiper) {
        swiper.params.speed = swiper.el.dataset.speed * 1 || swiper.params.speed;
        swiper.params.autoplay.delay = swiper.el.dataset.autoplayDelay * 1 || swiper.params.autoplay.delay;
        $currentSliderWrapperElement.css("--_animation-duration", `${swiper.params.speed}ms`);
    };
    function indicatorUpdate(swiper){
        const tabsElementInfo = $currentSliderTabsElement.get(0).getBoundingClientRect();
        const activeTabButtonInfo = swiper.pagination.bullets[swiper.realIndex].getBoundingClientRect();
        $currentSliderTabsElement.css("--_indicator-width", `${activeTabButtonInfo.width}px`);
        $currentSliderTabsElement.css("--_indicator-position-left", `${activeTabButtonInfo.left - tabsElementInfo.left}px`);
    };
    function tabsButtonUpdate(swiper){
        $currentSliderTabsButtonElement.removeClass('active');
        $currentSliderTabsButtonElement.eq(swiper.realIndex).addClass('active');
    }

    // For Mobile
    matchMediaQuery('(max-width: 767px)', function() {
        new Swiper($currentSliderElement.get(0), {
            ...sliderCommonOptions,
            spaceBetween: 32,
            pagination: {
                clickable: true,
                el: $currentSliderPaginationElement.get(0),
            },
            on: {
                beforeInit: sliderCommonBeforeInit,
                init: tabsButtonUpdate,
                resize: function(){
                    if (window.innerWidth > 767) location.reload();
                },
                realIndexChange: tabsButtonUpdate,
            },
        });
    });

    // For Desktop
    matchMediaQuery('(min-width: 768px)', function() {
        new Swiper($currentSliderElement.get(0), {
            ...sliderCommonOptions,
            virtualTranslate: true,
            pagination: {
                clickable: true,
                el: $currentSliderTabsElement.get(0),
                renderBullet: (bulletIndex, className)=> {
                    $currentSliderTabsButtonElement.eq(bulletIndex).addClass(className);
                    return $currentSliderTabsButtonElement[bulletIndex].outerHTML;
                },
            },
            on: {
                beforeInit: sliderCommonBeforeInit,
                init: function (swiper) {
                    indicatorUpdate(swiper);
                },
                resize: function (swiper) {
                    indicatorUpdate(swiper);
                    if (window.innerWidth < 768) location.reload();
                },
                realIndexChange: indicatorUpdate,
            }
        });
    });
});