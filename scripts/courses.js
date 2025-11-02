const courses = [
    {
        code: 'CSE110',
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        code: 'WDD130',
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        code: 'CSE111',
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        code: 'CSE210',
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        code: 'WDD131',
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        code: 'WDD231',
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function renderCourses(filter = 'all') {
const list = document.getElementById('course-list');
const creditCountEl = document.getElementById('credit-count');
if(!list) return;

// filter by course category
const filtered = courses.filter(c => {
    if(filter === 'all') return true;
    return c.subject.toLowerCase() === filter.toLowerCase();
});


list.innerHTML = '';
filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'course-card' + (c.completed ? ' completed' : '');
    card.setAttribute('tabindex','0');

    const left = document.createElement('div');
    left.innerHTML = `<strong>${c.code}</strong><div class="course-meta">${c.title}</div>`;

    const right = document.createElement('div');
    right.innerHTML = `<div class="course-meta">${c.credits} credit${c.credits>1?'s':''}</div>`;
    if(c.completed){
    const badge = document.createElement('div');
    badge.textContent = 'Completed';
    badge.setAttribute('aria-hidden','true');
    badge.style.marginTop = '.5rem';
    badge.style.fontWeight = '600';
    right.appendChild(badge);
    }

    card.appendChild(left);
    card.appendChild(right);
    list.appendChild(card);
});

// get total credit
const totalCredits = filtered.reduce((sum, cur) => sum + (cur.credits || 0), 0);
if(creditCountEl) creditCountEl.textContent = totalCredits;
}

// wire filter buttons
document.addEventListener('DOMContentLoaded', () => {
renderCourses('all');

const buttons = Array.from(document.querySelectorAll('.filter-btn'));
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
    const filter = btn.getAttribute('data-filter');
    // update aria-pressed
    buttons.forEach(b => b.setAttribute('aria-pressed','false'));
    btn.setAttribute('aria-pressed','true');
    renderCourses(filter);
    });
});
});