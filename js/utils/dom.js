// DOM UTILITY

export const DOM = {
    get(selector, context = document) {
        return context.querySelector(selector);
    },
    
    getAll(selector, context = document) {
        return context.querySelectorAll(selector);
    },
    
    create(tag, attributes = {}, content = '') {
        const el = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') el.className = value;
            else if (key === 'html') el.innerHTML = value;
            else if (key === 'text') el.textContent = value;
            else el.setAttribute(key, value);
        });
        if (typeof content === 'string') el.textContent = content;
        else if (content instanceof Node) el.appendChild(content);
        return el;
    },
    
    show(element) {
        if (element) {
            element.classList.remove('hidden');
            element.style.display = '';
        }
    },
    
    hide(element) {
        if (element) {
            element.classList.add('hidden');
        }
    },
    
    on(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
            return () => element.removeEventListener(event, handler);
        }
        return () => {};
    }
};

export default DOM;