export const setErrors = (title, description, category)=>{
    let errors = {};
    errors.title= title? "":"Title Required";
    errors.description= description? "":"Title Required";
    errors.category= category? "":"Title Required";
return errors;
};