const form = document.getElementById('form-rsvp');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    nome: form.nome.value,
    presenca: form.presenca.value,
    mensagem: form.mensagem.value
  };

  fetch('https://script.google.com/macros/s/AKfycbzmxhleBb8Hugi4FuCmANFentwbLHUNKJqJOLuhPGfauTBCTrBtH91Rzfp476QVhEg/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(async res => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }
    return res.json();
  })
  .then(response => {
    if (response.status === 'sucesso') {
      alert('Obrigado por confirmar presença!');
      form.reset();
    } else {
      alert('Erro: ' + response.mensagem);
    }
  })
  .catch(err => {
    console.error('Erro ao enviar:', err);
    alert('Erro ao enviar sua resposta. Tente novamente.');
  });
});