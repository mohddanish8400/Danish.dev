        const nav = document.getElementById("nav");
        const ham = document.getElementById("ham");
        const links = document.getElementById("links");
        const navItems = document.querySelectorAll('[data-link]');
        const progress = document.getElementById("progress");
        const topBtn = document.getElementById("top");
        const reveals = document.querySelectorAll(".reveal");
        const bars = document.querySelectorAll(".bar-fill");
        const typeEl = document.getElementById("type");
        const form = document.getElementById("form");
        const okMsg = document.getElementById("ok");
        const year = document.getElementById("year");
        const sections = document.querySelectorAll("main section[id]");

        function throttle(fn, wait) {
            if (wait === undefined) wait = 100;
            let busy = false;
            return function (...args) {
                if (!busy) {
                    fn(...args);
                    busy = true;
                    setTimeout(function () {
                        busy = false;
                    }, wait);
                }
            };
        }

        // navbar background change on scroll -----
        function navBg() {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        //hamburger toggle
        ham.addEventListener('click', function () {
            links.classList.toggle('open');
            ham.classList.toggle('open');
        });

        navItems.forEach(function (link) {
            link.addEventListener('click', function () {
                links.classList.remove('open');
                ham.classList.remove('open');
            });
        });

    
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var id = a.getAttribute('href');
                var el = document.querySelector(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

    
        function activeLink() {
            var current = '';
            var pos = window.scrollY + 120;
            sections.forEach(function (sec) {
                if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                    current = sec.id;
                }
            });
            navItems.forEach(function (link) {
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        // - progress bar
        function updateProgress() {
            var top = window.scrollY;
            var height = document.documentElement.scrollHeight - window.innerHeight;
            if (height > 0) {
                progress.style.width = (top / height * 100) + '%';
            } else {
                progress.style.width = '0%';
            }
        }

        
        function showTop() {
            if (window.scrollY > 400) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        }

        topBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        var revealObs = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('on');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function (el) {
            revealObs.observe(el);
        });

        var barObs = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    var bar = e.target;
                    var w = bar.style.width; // store the target width
                    bar.style.width = '0%';
                    // small delay then animate
                    setTimeout(function () {
                        bar.style.width = w;
                    }, 80);
                    obs.unobserve(bar);
                }
            });
        }, { threshold: 0.4 });

        bars.forEach(function (b) {
            barObs.observe(b);
        });

        //typing effect for hero subtitle
        var roles = ['Frontend Developer', 'UI Enthusiast', 'Problem Solver', 'Lifelong Learner'];
        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;

        function typeEffect() {
            var text = roles[roleIndex];
            typeEl.textContent = text.substring(0, charIndex);
            var delay = isDeleting ? 45 : 90;

            if (!isDeleting && charIndex === text.length) {
                isDeleting = true;
                delay = 1400;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400;
            } else {
                charIndex += isDeleting ? -1 : 1;
            }
            setTimeout(typeEffect, delay);
        }
        typeEffect();


        var fields = {
            name: {
                el: document.getElementById('name'),
                err: document.getElementById('nameErr'),
                check: function (v) { return v.trim().length >= 2; },
                msg: 'Please enter your name (min 2 chars).'
            },
            email: {
                el: document.getElementById('email'),
                err: document.getElementById('emailErr'),
                check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
                msg: 'Enter a valid email.'
            },
            subject: {
                el: document.getElementById('subject'),
                err: document.getElementById('subErr'),
                check: function (v) { return v.trim().length >= 3; },
                msg: 'Subject should be at least 3 characters.'
            },
            msg: {
                el: document.getElementById('msg'),
                err: document.getElementById('msgErr'),
                check: function (v) { return v.trim().length >= 10; },
                msg: 'Message should be at least 10 characters.'
            }
        };

        function validateField(f) {
            var ok = f.check(f.el.value);
            if (!ok) {
                f.el.classList.add('err');
            } else {
                f.el.classList.remove('err');
            }
            f.err.textContent = ok ? '' : f.msg;
            return ok;
        }

        for (var key in fields) {
            (function (f) {
                f.el.addEventListener('input', function () {
                    if (f.el.classList.contains('err')) {
                        validateField(f);
                    }
                });
            })(fields[key]);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;
            for (var k in fields) {
                if (!validateField(fields[k])) {
                    valid = false;
                }
            }

            if (valid) {
                okMsg.classList.add('show');
                // reset form
                for (var k2 in fields) {
                    fields[k2].el.value = '';
                    fields[k2].el.classList.remove('err');
                    fields[k2].err.textContent = '';
                }
                setTimeout(function () {
                    okMsg.classList.remove('show');
                }, 4000);
            } else {
                okMsg.classList.remove('show');
            }
        });

        year.textContent = new Date().getFullYear();


        document.addEventListener('DOMContentLoaded', function () {
            navBg();
            activeLink();
            updateProgress();
            showTop();

            var onScroll = throttle(function () {
                navBg();
                activeLink();
                updateProgress();
                showTop();
            }, 50);

            window.addEventListener('scroll', onScroll);
        });