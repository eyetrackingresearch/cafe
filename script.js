document.addEventListener('DOMContentLoaded', () => {
    // انتخاب تمامی لینک‌های ناوبری داخل هدر
    const navLinks = document.querySelectorAll('.icon-navigation a');
    // انتخاب عنصر هدر برای بدست آوردن ارتفاع آن
    const header = document.querySelector('header');

    // بررسی وجود هدر
    if (!header) {
        console.error('Error: Header element not found. Smooth scroll cannot be initialized.');
        return; // اگر هدر پیدا نشد، ادامه نده
    }

    console.log('JavaScript loaded. Initializing smooth scroll...');
    console.log('Header element found:', header);

    // افزودن Event Listener به هر یک از لینک‌ها
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // جلوگیری از رفتار پیش‌فرض لینک (پرش ناگهانی به بخش)
            e.preventDefault();

            // بدست آوردن ID بخش هدف از ویژگی href لینک
            const targetId = this.getAttribute('href'); 
            // انتخاب عنصر هدف با استفاده از ID
            const targetElement = document.querySelector(targetId);

            console.log(`Clicked on link: ${targetId}`);

            // اگر عنصر هدف پیدا شد
            if (targetElement) {
                // از getComputedStyle برای اطمینان از دریافت ارتفاع نهایی و رندر شده هدر استفاده می‌کنیم.
                // این روش در محیط‌های مختلف قابل اطمینان‌تر است.
                const headerStyle = window.getComputedStyle(header);
                const headerHeight = header.offsetHeight; // یا parseFloat(headerStyle.height);
                // console.log(`  Computed Header Height: ${parseFloat(headerStyle.height)}px`);

                // getBoundingClientRect().top موقعیت عنصر نسبت به viewport را می‌دهد.
                // window.pageYOffset (یا window.scrollY) موقعیت اسکرول فعلی صفحه را می‌دهد.
                // با جمع این دو، موقعیت مطلق عنصر در صفحه را بدست می‌آوریم.
                const targetOffsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // محاسبه موقعیت نهایی اسکرول: موقعیت هدف منهای ارتفاع هدر و یک مقدار اضافی
                // مقدار اضافی (مثلاً 20 پیکسل) برای ایجاد کمی فضای خالی بین هدر و عنوان بخش است.
                const offset = 20; // فضای اضافی بین هدر و عنوان بخش
                const scrollToPosition = targetOffsetTop - headerHeight - offset;

                // لاگ کردن مقادیر برای اشکال‌زدایی
                console.log(`  Target element found: ${targetId}`);
                console.log(`  Header Height: ${headerHeight}px`);
                console.log(`  Target Element Top (relative to document): ${targetOffsetTop}px`);
                console.log(`  Calculated Scroll Position: ${scrollToPosition}px`);

                // انجام اسکرول نرم به موقعیت محاسبه شده
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth' // فعال کردن اسکرول نرم
                });
            } else {
                console.error(`Error: Target element not found for ID: ${targetId}. Please check if the ID exists in the HTML.`);
            }
        });
    });
});
