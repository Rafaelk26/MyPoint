import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';

// Functions
import { formatTime } from '../../functions/formatTime';
import { formatCPF } from '../../functions/formatCPF';
import { formatDateToBrazil } from '../../functions/formatDateToBrazil';
import { getLogoBase64 } from '../../functions/getLogoBase64';

export async function generateWorkDayPDF(user, workDay, points = []){

    const logo = await getLogoBase64();
    
    function formatInterval(interval) {
        if (!interval) {
            return '00h 00min';
        }

        const match = String(interval).match(
            /(-?)(\d+):(\d+):(\d+)/
        );

        if (!match) {
            return '00h 00min';
        }

        const sign = match[1] === '-' ? '-' : '';
        const hours = match[2];
        const minutes = match[3];

        return `${sign}${hours}h ${minutes}min`;
    };

    const pointNames = {
        entry: 'Entrada',
        lunch_start: 'Almoço (Ida)',
        lunch_end: 'Almoço (Volta)',
        exit: 'Saída',
    };

    const pointsHTML = points.map(point => `
        <tr>
            <td class="label">
                ${pointNames[point.type] ?? point.type}
            </td>

            <td class="value">
                ${formatTime(point.time)}
            </td>
        </tr>
    `).join('');


    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    background: #f2f2f2;
                    font-family: Arial, sans-serif;
                    color: #222;
                }

                .pdf {
                    width: 794px;
                    min-height: 1123px;
                    margin: 0 auto;
                    padding: 40px;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .logo {
                    width: 80px;
                    height: auto;
                    margin-bottom: 5px;
                }

                h1 {
                    margin: 0;
                    text-align: center;
                    color: #0076FE;
                    font-size: 32px;
                }

                .date {
                    margin-top: 5px;
                    margin-bottom: 30px;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                }

                .section-func {
                    width: 100%;
                    margin-top: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .title-func {
                    margin: 0 0 5px 0;
                    font-size: 20px;
                }

                .row-func {
                    width: 55%;
                    display: flex;
                    justify-content: space-between;
                }

                .label {
                    font-weight: bold;
                }

                .value {
                    color: #333;
                }

                .section {
                    width: 100%;
                    margin-top: 30px;
                }

                .section h2 {
                    margin-bottom: 15px;
                    font-size: 20px;
                }

                .tabela {
                    width: 100%;
                    border-collapse: collapse;
                    border: 1px solid #e1e9fb;
                }

                .tabela th,
                .tabela td {
                    padding: 10px;
                    text-align: left;
                    border: 1px solid #e1e9fb;
                }

                .tabela th {
                    background-color: #e1e9fb;
                    font-weight: bold;
                }

                .tabela tr:last-child td {
                    border-bottom: 1px solid #e1e9fb;
                }

                .summary {
                    width: 100%;
                    margin-top: 25px;
                    padding: 15px;
                    border: 1px solid #e1e9fb;
                    border-radius: 4px;
                }

                .summary h2 {
                    margin-top: 0;
                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid #ddd;
                }

                .row:last-child {
                    border-bottom: none;
                }

                .status {
                    margin-top: 20px;
                    font-weight: bold;
                    text-align: center;
                }
            </style>
        </head>

        <body>
            <div class="pdf">
                <img
                    class="logo"
                    src="${logo}"
                    alt="MyPoint"
                >

                <h1>MyPoint</h1>

                <div class="date">
                    ${formatDateToBrazil(workDay?.date)}
                </div>

                <div class="section-func">

                    <h2 class="title-func">Funcionário</h2>

                    <div class="row-func">
                        <span class="label">Nome:</span>

                        <span class="value">
                            ${user?.name ?? '--'}
                        </span>

                    </div>

                    <div class="row-func">
                        <span class="label">CPF:</span>

                        <span class="value">
                            ${formatCPF(user?.cpf) ?? '--'}
                        </span>
                    </div>


                    <div class="row-func">
                        <span class="label">Cargo:</span>

                        <span class="value">
                            ${user?.position ?? '--'}
                        </span>
                    </div>


                    <div class="row-func">
                        <span class="label">Data:</span>

                        <span class="value">
                            ${formatDateToBrazil(workDay?.date)}
                        </span>
                    </div>

                </div>

                <div class="section">

                    <h2>Registros do dia</h2>


                    <table class="tabela">
                        <thead>
                            <tr>
                                <th>Evento</th>
                                <th>Horário</th>
                            </tr>

                        </thead>

                        <tbody>${pointsHTML}</tbody>
                    </table>

                    <div class="summary">

                        <h2>Resumo da Jornada</h2>


                        <div class="row">
                            <span class="label">Horas trabalhadas</span>

                            <span class="value">
                                ${formatInterval(
                                    workDay?.worked_hours
                                )}
                            </span>
                        </div>


                        <div class="row">
                            <span class="label">Horas extras</span>

                            <span class="value">
                                ${formatInterval(
                                    workDay?.extra_hours
                                )}
                            </span>
                        </div>


                        <div class="row">
                            <span class="label">Saldo do dia</span>

                            <span class="value">
                                ${formatInterval(
                                    workDay?.balance
                                )}
                            </span>
                        </div>
                    </div>

                    <div class="status">

                        Status:
                        ${workDay?.status === 'completed'
                            ? 'Jornada finalizada'
                            : 'Jornada em andamento'
                        }
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({
        html,
    });

    const date = workDay.date;
    const [year, month, day] = date.split('-');
    const fileName = `${day}-${month}-${year}.pdf`;
    const newUri = `${FileSystem.cacheDirectory}${fileName}`;

    await FileSystem.copyAsync({
        from: uri,
        to: newUri,
    });

    if (await Sharing.isAvailableAsync()) {

        await Sharing.shareAsync(newUri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Compartilhar relatório',
            UTI: 'com.adobe.pdf',
        });

    }

    return uri;
}