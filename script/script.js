
const cep = document.getElementById('cepEndereco1');
const cidade = document.getElementById('cidadeEndereco1');
const bairro = document.getElementById('bairroEndereco1');
const numero = document.getElementById('numeroEndereco1');
const complemento = document.getElementById('complementoEndereco1');
const mensagem = document.getElementById('mensagem');
const logradouro = document.getElementById('logradouroEndereco1');

// Consulta o CEP na API ViaCEP
async function consultarCEP() {

    // Remove tudo que não for número
    const valorCEP = cep.value.replace(/\D/g, '');

    // Verifica se o CEP possui 8 dígitos
    if (valorCEP.length !== 8) {
        mensagem.textContent = 'Digite um CEP válido.';
        mensagem.style.color = '#d62828';
        return;
    }

    mensagem.textContent = 'Consultando CEP...';
    mensagem.style.color = '#333';

    try {

        // Requisição para a API
        const resposta = await fetch(
            `https://viacep.com.br/ws/${valorCEP}/json/`
        );

        if (!resposta.ok) {
            throw new Error('Falha na comunicação com a API.');
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se o CEP existe
        if (dados.erro) {

            mensagem.textContent = 'CEP não encontrado.';
            mensagem.style.color = '#d62828';

            limparEndereco();

            return;
        }

        // Preenche os campos automaticamente
        cidade.value = dados.localidade || '';
        bairro.value = dados.bairro || '';
        logradouro.value = dados.logradouro || '';

        mensagem.textContent = 'Endereço localizado com sucesso!';
        mensagem.style.color = '#28d653';

        // Foca no campo número após a consulta
        numero.focus();

    } catch (erro) {

        mensagem.textContent = 'Erro ao consultar o CEP. Tente novamente.';
        mensagem.style.color = '#d62828';

        console.error('Erro na consulta:', erro);

    }
}


// Limpa os campos preenchidos pela API
function limparEndereco() {
    cidade.value = '';
    bairro.value = '';
    logradouro.value = '';
}


// Formata o CEP enquanto o usuário digita
cep.addEventListener('input', () => {

    let valor = cep.value.replace(/\D/g, '');

    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    cep.value = valor;

    mensagem.textContent = '';

    // Limpa os campos se o CEP estiver incompleto
    if (valor.replace(/\D/g, '').length < 8) {
        limparEndereco();
    }

    // Consulta automaticamente quando completar 8 dígitos
    if (valor.replace(/\D/g, '').length === 8) {
        consultarCEP();
    }

});



let etapaAtual = 1;

function mostrarEtapa(numero) {

    document.querySelectorAll('.etapa').forEach(etapa => {
        etapa.hidden = true;
        etapa.classList.remove('ativa');
    });

    const proxima = document.getElementById(`etapa${numero}`);

    proxima.hidden = false;
    proxima.classList.add('ativa');

    etapaAtual = numero;
}

function proximaEtapa() {
    mostrarEtapa(etapaAtual + 1);
}

function voltarEtapa() {
    mostrarEtapa(etapaAtual - 1);
}