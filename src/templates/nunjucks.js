export const nunjucksTemplate = () => {
    if (!window.nunjucks) return false;

    return {
        compile(template) {
            return (view) => window.nunjucks.render(template, view);
        }
    };
};
