export const nunjucksTemplate = () => {
    if (!window.nunjucks) return false;

    return {
        compile(template) {
            let instance = window.nunjucks.compile(template);
            return view => instance.render(view);
        }
    };
};
