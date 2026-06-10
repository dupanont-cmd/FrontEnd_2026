document.getElementById('calculateBtn').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    const grade1 = Number(document.getElementById('grade1').value);
    const grade2 = Number(document.getElementById('grade2').value);
    const grade3 = Number(document.getElementById('grade3').value);

    const result = document.getElementById('result');
    const studentInfo = document.getElementById('studentInfo');
    const averageInfo = document.getElementById('averageInfo');
    const statusInfo = document.getElementById('statusInfo');

    if (!studentName) {
        alert('Digite o nome do aluno');
        return;
    }

    if (isNaN(grade1) || isNaN(grade2) || isNaN(grade3)) {
        alert('Preencha todas as notas');
        return;
    }

    const average = (grade1 + grade2 + grade3) / 3;
    const averageFixed = average.toFixed(2);

    studentInfo.textContent = studentName;
    averageInfo.textContent = `Média: ${averageFixed}`;

    result.classList.remove('hidden', 'aprovado', 'exame', 'reprovado');

    if (average >= 7) {
        statusInfo.textContent = '✓ Aprovado';
        result.classList.add('aprovado');
    } else if (average >= 4) {
        const neededForTen = (10 - averageFixed).toFixed(2);
        statusInfo.textContent = `Exame - Faltam ${neededForTen} pontos para 10`;
        result.classList.add('exame');
    } else {
        statusInfo.textContent = '✗ Reprovado';
        result.classList.add('reprovado');
    }

    result.classList.remove('hidden');
});