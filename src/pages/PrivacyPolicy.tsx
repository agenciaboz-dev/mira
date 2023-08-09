import React from "react"
import { Box } from "@mui/material"
import { useParams } from "react-router-dom"

interface PrivacyPolicyProps {}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({}) => {
    const lang = useParams().lang

    const titleStyle: React.CSSProperties = {
        fontWeight: "bold",
    }

    return (
        <Box sx={{ flexDirection: "column", gap: "2vw", padding: "2vw" }}>
            {lang == "en" ? (
                <>
                    <span style={titleStyle}>Privacy Policy</span>
                    <p>
                        Mira Suprimentos built the Mira Suprimentos app as a Free app. This SERVICE is provided by Mira Suprimentos at no cost and is
                        intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure
                        of Personal Information if anyone decided to use our Service. If you choose to use our Service, then you agree to the
                        collection and use of information in relation to this policy. The Personal Information that we collect is used for providing
                        and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
                        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Mira
                        Suprimentos unless otherwise defined in this Privacy Policy.
                    </p>
                    <span style={titleStyle}>Information Collection and Use</span>
                    <p>
                        For a better experience, while using our Service, we may require you to provide us with certain personally identifiable
                        information, including but not limited to name, email, phone, cpf, address, credit and debit card. The information that we
                        request will be retained by us and used as described in this privacy policy. The app does use third-party services that may
                        collect information used to identify you. Link to the privacy policy of third-party service providers used by the app *
                        [Google Play Services](https://www.google.com/policies/privacy/) * [Expo](https://expo.io/privacy)
                    </p>
                    <span style={titleStyle}>Log Data</span>
                    <p>
                        We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information
                        (through third-party products) on your phone called Log Data. This Log Data may include information such as your device
                        Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our
                        Service, the time and date of your use of the Service, and other statistics.
                    </p>
                    <span style={titleStyle}>Cookies</span>
                    <p>
                        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your
                        browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these
                        “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and
                        improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to
                        your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
                    </p>
                    <span style={titleStyle}>Service Providers</span>
                    <p>
                        We may employ third-party companies and individuals due to the following reasons: * To facilitate our Service; * To provide
                        the Service on our behalf; * To perform Service-related services; or * To assist us in analyzing how our Service is used. We
                        want to inform users of this Service that these third parties have access to their Personal Information. The reason is to
                        perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any
                        other purpose.
                    </p>
                    <span style={titleStyle}>Security</span>
                    <p>
                        We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of
                        protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure
                        and reliable, and we cannot guarantee its absolute security.
                    </p>
                    <span style={titleStyle}>Links to Other Sites</span>
                    <p>
                        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note
                        that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these
                        websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any
                        third-party sites or services.
                    </p>
                    <span style={titleStyle}>Children’s Privacy</span>
                    <p>
                        These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from
                        children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we
                        immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us
                        with personal information, please contact us so that we will be able to do the necessary actions.
                    </p>
                    <span style={titleStyle}>Changes to This Privacy Policy</span>
                    <p>
                        We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We
                        will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of 2023-08-09
                    </p>
                </>
            ) : (
                <>
                    <span style={titleStyle}>Política de Privacidade</span>
                    <p>
                        A Mira Suprimentos desenvolveu o aplicativo Mira Suprimentos como um aplicativo gratuito. Este SERVIÇO é fornecido pela Mira
                        Suprimentos sem custo e é destinado para uso como está. Esta página é usada para informar os visitantes sobre nossas políticas
                        com a coleta, uso e divulgação de Informações Pessoais se alguém decidir usar o nosso Serviço. Se você optar por usar nosso
                        Serviço, concorda com a coleta e uso de informações em relação a esta política. As Informações Pessoais que coletamos são
                        usadas para fornecer e melhorar o Serviço. Não usaremos ou compartilharemos suas informações com ninguém, exceto conforme
                        descrito nesta Política de Privacidade. Os termos usados nesta Política de Privacidade têm os mesmos significados que em
                        nossos Termos e Condições, acessíveis na Mira Suprimentos, a menos que definido de outra forma nesta Política de Privacidade.
                    </p>
                    <span style={titleStyle}>Coleta e Uso de Informações</span>
                    <p>
                        Para uma melhor experiência ao utilizar nosso Serviço, podemos solicitar que você nos forneça algumas informações pessoalmente
                        identificáveis, incluindo, mas não se limitando a nome, e-mail, telefone, cpf, endereço, cartão de crédito e débito. As
                        informações que solicitamos serão retidas por nós e usadas conforme descrito nesta política de privacidade. O aplicativo usa
                        serviços de terceiros que podem coletar informações usadas para identificar você. Link para a política de privacidade dos
                        provedores de serviços de terceiros usados pelo aplicativo * [Google Play Services](https://www.google.com/policies/privacy/)
                        * [Expo](https://expo.io/privacy)
                    </p>
                    <span style={titleStyle}>Dados de Log</span>
                    <p>
                        Queremos informá-lo que sempre que você usar nosso Serviço, em caso de erro no aplicativo, coletamos dados e informações (por
                        meio de produtos de terceiros) em seu telefone chamados Dados de Log. Esses Dados de Log podem incluir informações como o
                        endereço de Protocolo de Internet (“IP”) do seu dispositivo, nome do dispositivo, versão do sistema operacional, configuração
                        do aplicativo ao utilizar nosso Serviço, hora e data de uso do Serviço e outras estatísticas.
                    </p>
                    <span style={titleStyle}>Cookies</span>
                    <p>
                        Cookies são arquivos com uma pequena quantidade de dados que são comumente usados como identificadores únicos anônimos. Estes
                        são enviados para o seu navegador pelos sites que você visita e são armazenados na memória interna do seu dispositivo. Este
                        Serviço não usa esses “cookies” explicitamente. No entanto, o aplicativo pode usar códigos e bibliotecas de terceiros que usam
                        “cookies” para coletar informações e melhorar seus serviços. Você tem a opção de aceitar ou recusar esses cookies e saber
                        quando um cookie está sendo enviado para o seu dispositivo. Se você optar por recusar nossos cookies, talvez não consiga usar
                        algumas partes deste Serviço.
                    </p>
                    <span style={titleStyle}>Provedores de Serviço</span>
                    <p>
                        Podemos empregar empresas e indivíduos terceirizados pelos seguintes motivos: * Facilitar nosso Serviço; * Fornecer o Serviço
                        em nosso nome; * Executar serviços relacionados ao Serviço; ou * Auxiliar-nos na análise de como nosso Serviço é usado.
                        Queremos informar aos usuários deste Serviço que esses terceiros têm acesso às suas Informações Pessoais. A razão é para
                        executar as tarefas atribuídas a eles em nosso nome. No entanto, eles são obrigados a não divulgar ou usar as informações para
                        qualquer outra finalidade.
                    </p>
                    <span style={titleStyle}>Segurança</span>
                    <p>
                        Valorizamos sua confiança em nos fornecer suas Informações Pessoais, portanto, estamos nos esforçando para usar meios
                        comercialmente aceitáveis de protegê-las. Mas lembre-se de que nenhum método de transmissão pela internet ou método de
                        armazenamento eletrônico é 100% seguro e confiável, e não podemos garantir sua segurança absoluta.
                    </p>
                    <span style={titleStyle}>Links para Outros Sites</span>
                    <p>
                        Este Serviço pode conter links para outros sites. Se você clicar em um link de terceiros, será direcionado para esse site.
                        Observe que esses sites externos não são operados por nós. Portanto, recomendamos fortemente que você reveja a Política de
                        Privacidade desses sites. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou
                        práticas de sites ou serviços de terceiros.
                    </p>
                    <span style={titleStyle}>Privacidade de Crianças</span>
                    <p>
                        Estes Serviços não se destinam a menores de 13 anos. Não coletamos intencionalmente informações pessoalmente identificáveis de
                        crianças menores de 13 anos. No caso de descobrirmos que uma criança menor de 13 anos nos forneceu informações pessoais,
                        excluímos imediatamente isso de nossos servidores. Se você for pai ou responsável e souber que seu filho nos forneceu
                        informações pessoais, entre em contato conosco para que possamos tomar as medidas necessárias.
                    </p>
                    <span style={titleStyle}>Alterações nesta Política de Privacidade</span>
                    <p>
                        Podemos atualizar nossa Política de Privacidade de tempos em tempos. Portanto, você é aconselhado a revisar esta página
                        periodicamente para quaisquer alterações. Notificaremos você sobre quaisquer alterações, publicando a nova Política de
                        Privacidade nesta página. Esta política é eficaz a partir de 2023-08-09.
                    </p>
                </>
            )}
        </Box>
    )
}
