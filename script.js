async function buscarCEP(){

  const cep = document.getElementById("cep").value;

  if(cep.length !== 8){
    alert("Digite um CEP válido!");
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  if(dados.erro){
    alert("CEP não encontrado!");
    return;
  }

  document.getElementById("rua").textContent = dados.logradouro;
  document.getElementById("bairro").textContent = dados.bairro;
  document.getElementById("cidade").textContent = dados.localidade;
  document.getElementById("estado").textContent = dados.uf;

  const textoQR = `
${dados.logradouro},
${dados.bairro},
${dados.localidade} - ${dados.uf},
CEP: ${dados.cep}
`;

  document.getElementById("qrcode").innerHTML = "";

  QRCode.toCanvas(textoQR, { width: 250 }, function(err, canvas){

    if(err){
      console.error(err);
      return;
    }

    document.getElementById("qrcode").appendChild(canvas);

  });

}