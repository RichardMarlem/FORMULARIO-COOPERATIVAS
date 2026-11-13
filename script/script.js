
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

// Pega valor de um select ou input pelo ID (retorna "" se não existir)
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}


function coletarDados() {
    return {

        // 1. DADOS PESSOAIS
        nome: val("nome"),
        nomeSocial: val("nomeSocial"),
        cpfCnpj: val("cpfCnpj"),
        dataNascimento: val("dataNascimento"),
        nomeMae: val("nomeMae"),
        nomePai: val("nomePai"),
        racaCor: val("racaCor"),
        estadoCivil: val("estadoCivil"),
        sexo: val("sexo"),

        deficienciaFisica: document.getElementById("deficienciaFisica").checked,
        deficienciaVisual: document.getElementById("deficienciaVisual").checked,
        deficienciaAuditiva: document.getElementById("deficienciaAuditiva").checked,
        deficienciaMental: document.getElementById("deficienciaMental").checked,
        deficienciaIntelectual: document.getElementById("deficienciaIntelectual").checked,

        nacionalidade: val("nacionalidade"),
        paisNascimento: val("paisNascimento"),
        estadoNascimento: val("estadoNascimento"),
        municipioNascimento: val("municipioNascimento"),

        // 2. DADOS DE ENDEREÇO
        cepEndereco1: val("cepEndereco1"),
        ufEndereco1: val("ufEndereco1"),
        cidadeEndereco1: val("cidadeEndereco1"),
        bairroEndereco1: val("bairroEndereco1"),
        logradouroEndereco1: val("logradouroEndereco1"),
        tipoLogradouroEndereco1: val("tipoLogradouroEndereco1"),
        numeroEndereco1: val("numeroEndereco1"),
        complementoEndereco1: val("complementoEndereco1"),
        telefoneEndereco1: val("telefoneEndereco1"),
        celularEndereco1: val("celularEndereco1"),
        emailEndereco1: val("emailEndereco1"),

        arquivoComprovanteEndereco: document.getElementById("arquivoComprovanteEndereco").files[0] || null,

        termoCienciaEmail: document.getElementById("termoCienciaEmail").checked,

        // 3. DOCUMENTOS PESSOAIS
        conselho: val("conselho"),
        numeroConselho: val("numeroConselho"),
        arquivoCarteira: document.getElementById("arquivoCarteira").files[0] || null,
        rg: val("rg"),
        emissorRg: val("emissorRg"),
        dataEmissaoRg: val("dataEmissaoRg"),
        numeroInss: val("numeroInss"),
        numeroPis: val("numeroPis"),
        arquivoPis: document.getElementById("arquivoPis").files[0] || null,
        numeroIss: val("numeroIss"),
        cnesCns: val("cnesCns"),
        dataEmissaoConselhoRegional: val("dataEmissaoConselhoRegional"),
        grauInstrucao: val("grauInstrucao"),
        arquivoDiploma: document.getElementById("arquivoDiploma").files[0] || null,

        // 4. CONDIÇÃO DE TRABALHO ESTRANGEIRO
        vistoPermanente: document.getElementById("vistoPermanente").checked,
        vistoTemporario: document.getElementById("vistoTemporario").checked,
        asilado: document.getElementById("asilado").checked,
        refugiado: document.getElementById("refugiado").checked,
        solicitanteRefugio: document.getElementById("solicitanteRefugio").checked,
        dependenteDiplomatico: document.getElementById("dependenteDiplomatico").checked,
        residenciaProvisoria: document.getElementById("residenciaProvisoria").checked,
        permanenciaConjuge: document.getElementById("permanenciaConjuge").checked,
        permanenciaDeficiencia: document.getElementById("permanenciaDeficiencia").checked,
        residenteFronteirico: document.getElementById("residenteFronteirico").checked,
        beneficiadoMercosul: document.getElementById("beneficiadoMercosul").checked,
        beneficiadoFederacao: document.getElementById("beneficiadoFederacao").checked,

        numeroRne: val("numeroRne"),
        orgaoEmissorRne: val("orgaoEmissorRne"),
        dataEmissaoRne: val("dataEmissaoRne"),
        casadoBrasileiro: val("casadoBrasileiro"),
        filhoBrasileiro: val("filhoBrasileiro"),
        dataChegadaBrasil: val("dataChegadaBrasil"),

        // 5. DADOS BANCÁRIOS
        numeroBanco: val("numeroBanco"),
        nomeBanco: val("nomeBanco"),
        agencia: val("agencia"),
        contaCorrente: val("contaCorrente"),

        termoDeclaracaoOnorarios: document.getElementById("termoDeclaracaoOnorarios").checked,

        // 6. ESPECIALIDADES
        especialidadePrincipal: val("especialidadePrincipal"),
        rqePrincipal: val("rqePrincipal"),
        especialidade01: val("especialidade01"),
        rqe1: val("rqe1"),
        especialidade02: val("especialidade02"),
        rqe2: val("rqe2"),
        especialidade03: val("especialidade03"),
        rqe3: val("rqe3"),
        especialidade04: val("especialidade04"),
        rqe4: val("rqe4"),
        outrasEspecialidades: val("outrasEspecialidades"),

        // CONVÊNIOS
        convenios: document.getElementById("convenios").checked,
        ipsm: document.getElementById("ipsm").checked,
        sus: document.getElementById("sus").checked,
        unimedbhnaocooperado: document.getElementById("unimedbhnaocooperado").checked,

        // LOCAL DE ATENDIMENTO PRINCIPAL
        localAtendimentoPrincipal: val("localAtendimentoPrincipal"),
        atendimentoMedicoUrgenciaPrincipal: document.getElementById("atendimentoMedicoUrgenciaPrincipal").checked,
        consultaMedicaPrincipal: document.getElementById("consultaMedicaPrincipal").checked,
        procedimentoContatoPacientePrincipal: document.getElementById("procedimentoContatoPacientePrincipal").checked,
        intervacoesPrincipal: document.getElementById("intervacoesPrincipal").checked,
        outroTipoAtuacaoPrincipal: val("outroTipoAtuacaoPrincipal"),

        // LOCAL DE ATENDIMENTO 01
        localAtendimento01: val("localAtendimento01"),
        atendimentoMedicoUrgencia01: document.getElementById("atendimentoMedicoUrgencia01").checked,
        consultaMedica01: document.getElementById("consultaMedica01").checked,
        procedimentoContatoPaciente01: document.getElementById("procedimentoContatoPaciente01").checked,
        intervacoes01: document.getElementById("intervacoes01").checked,
        outroTipoAtuacao01: val("outroTipoAtuacao01"),

        // LOCAL DE ATENDIMENTO 02
        localAtendimento02: val("localAtendimento02"),
        atendimentoMedicoUrgencia02: document.getElementById("atendimentoMedicoUrgencia02").checked,
        consultaMedica02: document.getElementById("consultaMedica02").checked,
        procedimentoContatoPaciente02: document.getElementById("procedimentoContatoPaciente02").checked,
        intervacoes02: document.getElementById("intervacoes02").checked,
        outroTipoAtuacao02: val("outroTipoAtuacao02"),

        // LOCAL DE ATENDIMENTO 03
        localAtendimento03: val("localAtendimento03"),
        atendimentoMedicoUrgencia03: document.getElementById("atendimentoMedicoUrgencia03").checked,
        consultaMedica03: document.getElementById("consultaMedica03").checked,
        procedimentoContatoPaciente03: document.getElementById("procedimentoContatoPaciente03").checked,
        intervacoes03: document.getElementById("intervacoes03").checked,
        outroTipoAtuacao03: val("outroTipoAtuacao03"),

        // LOCAL DE ATENDIMENTO 04
        localAtendimento04: val("localAtendimento04"),
        atendimentoMedicoUrgencia04: document.getElementById("atendimentoMedicoUrgencia04").checked,
        consultaMedica04: document.getElementById("consultaMedica04").checked,
        procedimentoContatoPaciente04: document.getElementById("procedimentoContatoPaciente04").checked,
        intervacoes04: document.getElementById("intervacoes04").checked,
        outroTipoAtuacao04: val("outroTipoAtuacao04"),

        // TERMOS E DECLARAÇÕES
        termoCienciaTratamentoDados: document.getElementById("termoCienciaTratamentoDados").checked,
        termoCienciaPpp: document.getElementById("termoCienciaPpp").checked,

        // APOSENTADORIA
        recebeBeneficioAposentadoria: val("recebeBeneficioAposentadoria"),
        regimeAposentadoria: val("regimeAposentadoria"),
        tipoDeAposentadoria: val("tipoDeAposentadoria"),
        cienciaCooperado: val("cienciaCooperado"),
        dataCienciaCooperado: val("dataCienciaCooperado"),
        termoCienciaCapitalSocial: document.getElementById("termoCienciaCapitalSocial").checked

    };
}

function montarFormData() {
    const dados = coletarDados();
    const formData = new FormData();

    Object.entries(dados).forEach(([campo, valor]) => {

        // Ignora campos sem valor
        if (valor === null || valor === undefined) {
            return;
        }

        // Arquivos: PDF, imagem etc.
        if (valor instanceof File) {
            formData.append(campo, valor);
            return;
        }

        // Objetos e arrays precisam ser convertidos para JSON
        if (typeof valor === "object") {
            formData.append(campo, JSON.stringify(valor));
            return;
        }

        // Textos, números e booleanos
        formData.append(campo, valor);

    });

    return formData;
}

console.table.coletarDados()