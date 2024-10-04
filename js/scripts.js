
document.addEventListener('DOMContentLoaded', function () {
    const caregiverBtn = document.getElementById('caregiver-btn');
    const returnBtn = document.getElementById('return-btn');
    const formSlider = document.querySelector('.form-slider');

    // Alternar para o formulário de cuidador
    caregiverBtn.addEventListener('click', function () {
        formSlider.classList.add('slider-move');
    });

    // Voltar para o formulário de tutor
    returnBtn.addEventListener('click', function () {
        formSlider.classList.remove('slider-move');
    });
});


