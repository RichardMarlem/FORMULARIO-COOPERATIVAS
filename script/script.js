const formulario = document.getElementById('formulario')

function mudarPerguntas() {
    formulario.innerHTML = `
        <h2>TESTANDO</h2>
        <div class="dados-form">
                    <div class="campos-form">
                        <label for="conselho">Conselho<span>*<small>Obrigatório</small></span></label>
                        <select name="conselho" id="conselho" >
                            <option value="">Selecione</option>
                            <option value="CRM-MG">CRM-MG</option>
                        </select>
                    </div>

                    <div class="campos-form">
                        <label for="numeroConselho">Nº do Conselho<span>*<small>Obrigatório</small></span></label>
                        <input type="text" name="numeroConselho" id="numeroConselho"  placeholder="12345">
                    </div>

                </div>

                <div class="dados-form-anexo">
                    <div class="anexos-form">
                        <label for="arquivoCarteira"><i class="fa-solid fa-file-import"></i>Anexe a sua Carteirinha<span>*<small>Obrigatório</small></span></label>
                        <input type="file" name="arquivoCarteira" id="arquivoCarteira" >
                    </div>
                </div>

                <div class="dados-form">
                    <div class="campos-form">
                        <label for="nome">Nome<span>*<small>Obrigatório</small></span></label>
                        <input type="text" name="nome" id="nome"  placeholder="Ex: Richard Marlem Salvador Corrêa">
                    </div>

                    <div class="campos-form">
                        <label for="nomeSocial">Nome Social</label>
                        <input type="text" name="nomeSocial" id="nomeSocial" placeholder="Opcional">
                    </div>

                    <button onclick="voltarPerguntas()">Anterior</button>
    </div>
    `;
}