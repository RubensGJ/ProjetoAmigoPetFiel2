document.addEventListener('DOMContentLoaded', function () {
    // Seção de Registro (register.html)
    const caregiverBtn = document.getElementById('caregiver-btn');
    const returnBtn = document.getElementById('return-btn');
    const formSlider = document.querySelector('.form-slider');

    if (caregiverBtn && returnBtn && formSlider) {
        // Alternar para o formulário de cuidador
        caregiverBtn.addEventListener('click', function () {
            formSlider.classList.add('slider-move');
        });

        // Voltar para o formulário de tutor
        returnBtn.addEventListener('click', function () {
            formSlider.classList.remove('slider-move');
        });
    }

    // Seção de Login (login.html)
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
        // Alternar para a visualização de "cuidador"
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        // Alternar para a visualização de "tutor"
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }
});
