const form = document.getElementById('form-rsvpasd');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    nome: form.nome.value,
    presenca: form.presenca.value,
    mensagem: form.mensagem.value
  };

  fetch('https://script.google.com/macros/s/AKfycbzmxhleBb8Hugi4FuCmANFentwbLHUNKJqJOLuhPGfauTBCTrBtH91Rzfp476QVhEg/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(async res => {
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Erro HTTP:', res.status, errorText);
      throw new Error(`Erro HTTP ${res.status}`);
    }

    const result = await res.json();
    console.log('Resposta do servidor:', result);
    alert('Obrigado por confirmar presença!');
    form.reset();
  })
  .catch(err => {
    console.error('Erro ao enviar:', err.message || err);
    alert('Erro ao enviar sua resposta. Tente novamente.');
  });
});
