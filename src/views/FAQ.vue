<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="text-h4">Wortgut-Anleitung</p>

      </v-col>
    </v-row>
    <v-row
        class="text-body-1">
      <v-expansion-panels focusable popout>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Was ist Wortgut?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Wortgut ist ein interaktives Citizen Science-Wörterbuch. Es wird nicht wie ein normales Wörterbuch von
              sogenannten Lexikograph*innen erstellt, sondern von interessierten Bürger*innen. Jede*r kann mitmachen und
              nur mit euren Beiträgen wächst die Sammlung!</p>
            <p>Mit Wortgut können also Sprecher*innen der deutschen Sprache in Österreich gemeinsam ein digitales
              Wörterbuch erstellen, indem sie Wörter, die sie verwenden oder gehört haben, auf der Website eintragen und
              mit Zusatzinformationen versehen. So entsteht eine große Sammlung an Wörtern, die in Österreich verwendet
              werden und von denen einige vielleicht noch nie in einem Wörterbuch zu finden waren. Dabei geht es nicht
              nur um Wörter der Standardsprache („Hochdeutsch“), sondern aller Formen und Arten (sogenannte Varietäten)
              der deutschen Sprache in Österreich – ob Jugendsprache, Dialekt, Fachsprache, … Wenn du das Wort in
              Österreich verwendest, passt es in unsere Sammlung!</p>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
        >
          <v-expansion-panel-header>
            Wie kann ich mich registrieren?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Um Wörter eintragen zu können, musst du dich registrieren. Klicke dafür rechts oben auf die Schaltfläche
              „Login“ und dann auf “Registrieren”.</p>
            <p>Füll die folgenden Felder aus:</p>
            <ul>
              <li>E-Mail: Trage eine gültige E-Mail-Adresse ein. Damit kannst du dein Passwort zurücksetzten, wenn du es
                einmal vergisst.
              </li>
              <li>Benutzername: Trage einen Benutzernamen ein. Dieser ist für alle anderen <b>sichtbar und wird mit
                jedem Wörterbucheintrag, den du erstellst, angezeigt</b>!
              </li>
              <li>Ort/Region: Trag deinen Wohnort ein. (kein Pflichtfeld)</li>
              <li>Passwort: Wähle ein Passwort. Dieses muss aus mindestens 8 Zeichen bestehen. Bestätige dieses Passwort
                in der nächsten Zeile.
              </li>
              <li>Bestätige, dass du die
                <router-link to="/dataprotection">Datenschutzrichtlinien</router-link>
                gelesen hast.
              </li>
              <li>Klicke auf Registrieren.</li>
            </ul>
            <div class="vid-container">
            <video style=" margin-left: auto;
    margin-right: auto;
    display: block" controls src="../assets/faq/Registrieren.mp4" width="500px">Ihr Browser unterstützt das Video
              Element nicht
            </video>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie ist Wortgut aufgebaut? Wo finde ich was? Wo kann ich was tun?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Wenn du eingeloggt bist, siehst du folgende Punkte in der linken Navigationsleiste: </p>
            <ul>
              <li>
                <v-icon>mdi-chevron-left</v-icon>
                : mit dem Pfeil kannst du die Navigationsleiste ein- und ausklappen
              </li>
              <li>
                <v-icon>mdi-home-outline</v-icon>
                Start: Auf der Startseite findest du den Willkommenstext. Außerdem werden beliebte und heiß diskutierte
                Wörterbucheinträge angezeigt. Darunter kannst du gleich dein erstes Wort eingeben oder eine Frage an die
                Community stellen.
              </li>
              <li>
                <v-icon>mdi-sofa-outline</v-icon>
                Wörter: Alle Wörter, die von den Benutzer*innen gesammelt, als Wörterbucheintrag angelegt wurden und
                öffentlich sichtbar sind, werden angezeigt. Du kannst nach Wörtern suchen, sie sortieren und zu
                Sammlungen hinzufügen. <span class="text--secondary">(mehr zur Wörterecke findest du hier unter „Wie kann ich nach Wörtern suchen?“, „Wie kann ich Wörter sortieren?“, „Wie kann ich Wörter anzeigen lassen?“, „Wie kann ich auf einen Wörterbucheintrag reagieren?“)</span>
              </li>
              <li>
                <v-icon>mdi-view-dashboard-variant-outline</v-icon>
                Pinnwand: Die Pinnwand ist dein persönliches Dashboard, auf dem du Folgendes findest:
              </li>
              <ul>
                <li> in der Spalte „Meine Wörter“ die selbst erstellten Wörterbucheinträge</li>
                <li> in der Spalte „Meine Sammlungen“ deine selbst erstellten Sammlungen</li>
                <li> in der Spalte „Entdecke neue Wörter“ die Wörterbucheinträge von anderen Nutzer*innen</li>
                <li> in der Spalte „Fragen“ kannst du den anderen Nutzer*innen Fragen zum Thema Deutsch in Österreich
                  stellen, z.B. „Was bedeutet Hoppadatsch?“ oder „Welche Wörter verwenden nur eure Großeltern?“; es
                  werden dir auch die Fragen von anderen angezeigt
                </li>
              </ul>
              <li>
                <v-icon>mdi-file-multiple-outline</v-icon>
                Sammlungen: Sammlungen sind Zusammenstellungen zu speziellen Themen. Es gibt private Sammlungen nur für
                dich, Gruppensammlungen und öffentliche.<span class="text--secondary"> (mehr zu Sammlungen findest du unter „Was ist eine Sammlung?
                Wie kann ich eine Sammlung erstellen?)</span>
              </li>
              <li>
                <v-icon>mdi-account-group-outline</v-icon>
                Gruppen: Hier kannst du deine Gruppen verwalten und auf öffentliche Gruppen zugreifen.<span
                  class="text--secondary"> (mehr zu Gruppen
                findest du unter „Wie kann ich eine Gruppe erstellen? Wie kann ich meine Gruppe für andere unsichtbar
                schalten? Wie kann ich eine geschlossene Gruppe erstellen? Wie können andere Benutzer*innen meiner
                Gruppe beitreten?“)</span>
              </li>
              <li>
                <v-icon>mdi-chat-processing-outline</v-icon>
                Fragen: Du kannst Fragen zu Deutsch in Österreich an die Community stellen und mit anderen darüber
                diskutieren. <span class="text--secondary">(mehr zu Fragen findest du unter „Wie kann ich Fragen stellen? Wie kann ich Fragen von
                anderen Benutzer*innen beantworten? Wie kann ich mit anderen diskutieren?“)</span>
              </li>
              <li>
                <v-icon>mdi-plus</v-icon>
                Wort erstellen: Du kannst selbst Wörter in Wortgut eintragen. Dabei kannst du zwischen drei
                Schwierigkeitsgraden wählen. <span class="text--secondary">(mehr zum Erstellen von Wörtern findest du unter „Wie kann ich ein Wort
                hinzufügen? Wie kann ich einen Wörterbucheintrag erstellen?“)</span>
              </li>
              <li>
                <v-icon>mdi-chart-line</v-icon>
                Bestenliste: Auf der Rangliste kannst du dich mit anderen Wörtersammler*innen vergleichen.
              </li>
              <li>
                <v-icon>mdi-help-circle-outline</v-icon>
                Hilfe: Hier befindest du dich gerade. Im Hilfebereich findest du alle Funktionen Schritt für Schritt
                erklärt.
              </li>
            </ul>

          </v-expansion-panel-content>
        </v-expansion-panel>


        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich nach Wörtern suchen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Du kannst nach Wörtern suchen, indem du entweder </p>
            <ul>
              <li>oben in der Titelleiste von Wortgut, das gesuchte Wort in das Suchfeld eingibst <span
                  class="red--text">(a)</span></li>
              <li>oder im Bereich
                <v-icon color="black" small>mdi-sofa-outline</v-icon>
                Wörter die Funktionen „Suchen“ nutzt, um gezielt zu suchen <span class="red--text">(b)</span>:
              </li>
              <ul>
                <li>nach dem Lemma („Dialektwort, Jugendwort“ usw.)</li>
                <li>nach der standardsprachlichen („hochdeutschen“) Entsprechung</li>
                <li>nach der Bedeutungserklärung (Definition)</li>
                <li>nach der Kategorie (z.B. Sport, Essen, Mathematik)</li>
                <li>nach der Varietät, also einer bestimmten Sprechweise (z.B. Wienerisch, Pinzgauerisch, Jugendsprache,
                  Fachsprache)
                </li>
              </ul>
            </ul>
            <div class="img img-search"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>


        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich Wörter sortieren?
          </v-expansion-panel-header>
          <v-expansion-panel-content>

            <p>Du kannst die Wörter sortieren nach:</p>
            <ul>
              <li>dem Lemma</li>
              <li>der standarddeutschen Entsprechung</li>
              <li>dem Erstellungsdatum (erstellt am)</li>
            </ul>
            <div class="img img-sort"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich Wörter anzeigen lassen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Unter
              <v-icon color="black" small>mdi-sofa-outline</v-icon>
              Wörter kannst du zwischen zwei Ansichten wählen:
            </p>
            <ul>
              <li>der Kachelansicht <span class="red--text">(a)</span></li>
              <li>der Listenansicht <span class="red--text">(b)</span></li>

            </ul>
            <div class="img img-view"></div>

          </v-expansion-panel-content>

        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich auf einen Wörterbucheintrag reagieren?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Du kannst mit dem Daumen und einem zufälligen Adjektiv (Eigenschaftswort) in der linken unteren Ecke
              einer Wortkachel zeigen, dass dir der Eintrag gefällt <span class="red--text">(a)</span>. Wenn du auf die
              Wortkachel klickst, kannst du auch
              deine Meinung zu dem Wort abgeben <span class="red--text">(b)</span>.</p>
            <div class="img img-like"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wo finde ich alle meine Wörter und Sammlungen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Auf der
              <v-icon color="black" small>mdi-view-dashboard-variant-outline</v-icon>
              Pinnwand werden dir deine Wörter sowie deine Sammlungen angezeigt.
            </p>
            <p>Unter
              <v-icon color="black" small>mdi-file-multiple-outline</v-icon>
              Sammlungen findest du nicht nur deine privaten Zusammenstellungen, sondern auch die von Gruppen und
              öffentliche.
            </p>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Was ist eine Sammlung? Wie kann ich eine Sammlung erstellen? Wie kann ich Gruppensammlungen erstellen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Sammlungen sind Zusammenstellungen von Wörtern zu einem bestimmten Thema, z.B. eine Sammlung zum Thema
              „Vorarlbergerisch“, „Wiener Kulinarik“ oder „Mundartverein Nirwana“.</p>
            <p>Auf der Unterseite
              <v-icon color="black" small>mdi-file-multiple-outline</v-icon>
              Sammlungen
            </p>
            <ul>
              <li>kannst du dir unter „Privat“ <span class="red--text">(a)</span> mit „Meine eigenen Sammlungen“ <span
                  class="red--text">(b)</span> deine ganz persönlichen Zusammenstellungen
                ansehen. Jede*r Nutzer*in hat eine Favoritensammlung, mit der du ganz einfach deine Lieblingswörter
                sammeln kannst, indem du bei einem Wort-Kästchen rechts unten auf das Herz klickst. Du kannst dir aber
                auch die Sammlungen von Gruppen anzeigen lassen, indem du auf „Meine eigenen Sammlungen“ <span
                    class="red--text">(b)</span> und dann auf
                den entsprechenden Gruppennamen klickst <span class="text--secondary"> (mehr zu Gruppen findest du unter „Wie kann ich eine Gruppe erstellen? Wie kann ich meine Gruppe für andere unsichtbar schalten? Wie kann ich eine geschlossene Gruppe erstellen? Wie können andere Benutzer*innen meiner Gruppe beitreten?“)</span>
              </li>
              <li>Unter Öffentlich kannst du dir alle öffentlichen Sammlungen ansehen, in der jede*r mitsammeln kann
                <span class="red--text">(c)</span>.
              </li>

            </ul>
            <p>Du kannst selbst Sammlungen erstellen, indem du auf die grün hinterlegten Worte “eigene Sammlung
              erstellen” oder auf die drei Menüpunkte <span class="red--text">(d)</span> rechts über dem Fließtext und
              dann auf “neue Sammlung erstellen”
              klickst. </p>
            <p>Wenn du eine Sammlung für eine Gruppe erstellen möchtest, machst du das am besten auf der
              <v-icon color="black" small>mdi-account-group-outline</v-icon>
              Unterseite
              Gruppen . Klicke auf die entsprechende Gruppe und dann auf den grünen Schriftzug „Sammlung erstellen“
              <span class="red--text">(e)</span>.
              Du kannst nur Sammlungen in einer Gruppe erstellen, wenn du die Gruppe selbst gegründet hast oder wenn in
              den Gruppeneinstellungen das Bearbeitungsrecht „Mitglieder können Sammlungen erstellen“ aktiviert ist.
            </p>
            <p>Wenn du eine Sammlung versehentlich löschst, kannst du auf der Seite Sammlungen (bei Gruppensammlungen
              auf der Seite der Gruppe) über die drei Menüpunkte auch auf den Papierkorb
              zugreifen und sie wiederherstellen <span class="red--text">(d)</span>.</p>
            <div class="img img-collection"></div>
            <div class="img img-create-group-collection"></div>


          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich Wörter zu einer Sammlung hinzufügen?

          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Du kannst Wörter zu einer Sammlung hinzufügen, indem du:</p>
            <ul>
              <li>die Sammlung öffnest und die Schaltfläche „Wörter hinzufügen“ klickst. Dadurch öffnet sich das Fenster
                „Wörter hinzufügen“. Hier kannst du bereits eingetragene Wörter durch Klicken auf das Plus-Symbol
                <v-icon color="black" small>mdi-plus</v-icon>
                zu deiner Sammlung hinzufügen oder gezielt nach einem Wort suchen, indem du es in das Suchfeld eingibst.
              </li>

              <li>unter
                <v-icon color="black" small>mdi-sofa-outline</v-icon>
                Wörter bei der Wortkachel rechts unten auf „zu Sammlung hinzufügen“ (
                <v-icon color="black" small>mdi-file-plus-outline</v-icon>
                ) klickst und die entsprechende auswählst oder du fügst das Wort mit dem Herz (
                <v-icon color="black" small>mdi-heart-outline</v-icon>
                ) direkt zu deiner Favoritensammlung hinzu.
              </li>
              <li>ein Wort erstellst <span class="text--secondary">(siehe „Wie kann ich ein Wort hinzufügen? Wie kann ich einen Wörterbucheintrag erstellen?“) </span>
                und es dabei direkt der Sammlung hinzufügst.
              </li>

            </ul>
            <div class="vid-container">
            <video  controls src="../assets/faq/WortHinzufügen1.mp4" width="500px">Ihr Browser unterstützt das Video
              Element nicht
            </video>
            </div>
              <div class="vid-container">
            <video  controls src="../assets/faq/WortHinzufügen3.mp4" width="500px">Ihr Browser unterstützt das Video
              Element nicht
            </video></div>

            <div class="img img-add-word"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich eine Gruppe erstellen? Wie kann ich meine Gruppe für andere unsichtbar schalten? Wie kann ich
            eine geschlossene Gruppe erstellen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Du kannst nicht nur allein, sondern auch mit anderen in einer Gruppe Sammlungen befüllen. Beispielsweise
              kannst du eine Gruppe für deinen Verein oder deine Schulklasse erstellen.
            </p>
            <p> Um eine neue Gruppe zu erstellen, klicke auf der Unterseite
              <v-icon color="black" small>mdi-account-group-outline</v-icon>
              Gruppen auf die grün hinterlegten Worte “erstelle hier eine Gruppe” oder auf die drei Menüpunkte rechts (
              <v-icon color="black" small>mdi-dots-vertical</v-icon>
              ) über dem Fließtext und auf “neue Gruppe erstellen”.
            </p>
            <p>Im Dialogfenster kannst du folgende Informationen für deine „Neue Gruppe“ eingeben:</p>
            <ul>
              <li>den „Gruppennamen“ kannst du frei wählen. (Pflichtfeld)</li>
              <li>mit einer „Beschreibung“ kannst du näher deine Gruppe beschreiben</li>
              <li>du kannst eine „Organisation“ angeben, z.B. deine Schule oder deinen Verein</li>
              <li>unter den Bearbeitungsrechten kannst du einstellen,</li>
              <ul>
                <li> ob Mitglieder Sammlungen erstellen können sollen oder nicht. Als Ersteller*in der Gruppe kannst du
                  immer Sammlungen erstellen.
                </li>
                <li> ob jede*r die Sammlung sehen können soll. Wenn sie öffentlich sichtbar ist, kannst du auch allen
                  erlauben Sammlungen zu erstellen oder deiner Gruppe beizutreten.
                </li>
                <li> ob deine Gruppe mit einem Passwort geschützt werden soll und wenn ja, mit welchem.</li>

              </ul>


            </ul>
            <p> Diese Einstellungen kannst du jederzeit in deiner Gruppe ändern. Öffnen dafür die Gruppe, klicke rechts
              oben auf die drei Punkte (
              <v-icon color="black" small>mdi-dots-vertical</v-icon>
              ) und dann auf „Einstellungen“.
            </p>
            <div class="img img-create-group"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie können andere Benutzer*innen meiner Gruppe beitreten? Wie kann ich neue Mitglieder in meine Gruppe
            einladen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Du kannst deine Gruppe für alle sichtbar und offen machen, sodass alle beitreten können.</p>
            <p>Wenn du aber eine geschlossene Gruppe haben möchtest, musst du deine Mitglieder einladen. Klicke dafür in
              der Gruppe rechts oben auf die drei Punkte (
              <v-icon color="black" small>mdi-dots-vertical</v-icon>
              ) und rufe mit „Einladungs-Link“ <span class="red--text">(a)</span> den Link auf. Kopiere den Link <span class="red--text">(b)</span> und lade die zukünftigen Mitglieder per
              E-Mail ein. Wenn sie noch keinen Wortgut-Account haben, gelangen sie auf die „Registrieren“-Seite. Sonst
              kommen sie direkt in die Gruppe.
            </p>
            <div class="img img-invite"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich die Mitglieder einer Gruppe anzeigen? Wie kann ich Mitglieder aus einer Gruppe löschen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Jedes Gruppenmitglied kann die Benutzernamen aller Mitglieder sehen. Rufe dafür die Gruppe auf, klicke
              rechts oben auf die drei Menüpunkte (
              <v-icon color="black" small>mdi-dots-vertical</v-icon>
              ) und dann auf „Mitglieder“ <span class="red--text">(a)</span>.
            </p>
            <p>Der*die Gruppengründer*in kann jederzeit Mitglieder aus der Gruppe entfernen, indem er*sie in der
              Mitgliederliste rechts neben dem entsprechenden Benutzernamen auf das Papierkorb-Symbol (
              <v-icon color="black" small>mdi-delete</v-icon>
              ) klickt <span class="red--text">(b)</span>.
            </p>
            <div class="img img-member"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>


        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich eine Gruppe löschen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              Du kannst eine Gruppe löschen, indem du in der Gruppe rechts oben auf die drei Punkten (
              <v-icon color="black" small>mdi-dots-vertical</v-icon>
              ) und dann auf
              „Gruppe löschen“ klickst. Wenn du eine gelöschte Gruppe wiederherstellen möchtest, kannst du auf der
              Gruppen-Seite auf die drei Menüpunkte (
              <v-icon color="black" small>mdi-dots-vertical</v-icon>
              ) und dort auf “Papierkorb” gehen. Durch einen Klick auf das
              <v-icon color="black" small>mdi-plus</v-icon>
              -Symbol neben der gelöschten Gruppe wird sie wiederhergestellt. Nur wer die Gruppe erstellt hat kann
              sie löschen und auch wiederherstellen.
            </p>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich Fragen stellen? Wie kann ich Fragen von anderen Benutzer*innen beantworten? Wie kann ich mit
            den anderen diskutieren?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Wenn du eine Frage zum Thema Deutsch in Österreich hast, z.B. „Was bedeutet das Wort Haberer?“, „Was sind
              typische Jugendworte?“ oder „Wo sagt man wirklich noch Paradeiser?“ kannst du sie unter
              <v-icon color="black" small>mdi-chat-processing-outline</v-icon>
              Fragen an alle Benutzer*innen stellen, indem du sie unter „Fragen“ im Textfeld einträgst und auf das
              Symbol zum Absenden (
              <v-icon color="black" small>mdi-send</v-icon>
              ) klickst.
            </p>
            <p>Wenn du eine Frage zu Wortgut oder Verbesserungsvorschläge hast, kannst du diese gerne per E-Mail an <a
                href="mailto:ideen@dioe.at">ideen@dioe.at</a> stellen.</p>
            <p>Um eine Frage von anderen Benutzer*innen zu beantworten, klicke in der Kachel der jeweiligen Frage rechts
              unten auf das Kommentar-Symbol
              <v-icon color="black" small>mdi-comment</v-icon>
              , gib im Textfeld dein Kommentar ab und klicke dann auf das Abschicken-Symbol
              <v-icon color="black" small>mdi-chat-processing-outline</v-icon>
              oder drück auf der Tastatur ENTER (die Eingabetaste). Dein Kommentar ist dann für alle anderen
              Benutzer*innen sichtbar.
            </p>
            <p>Du kannst anderen Benutzer*innen keine Privatnachrichten schicken. Du kannst auch keine
              Gruppennachrichten schicken.</p>
            <div class="img img-post"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich problematische Wörter oder problematische Fragen melden?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Wenn du Fragen oder Wörterbucheinträge findest, die gegen unsere Netiquette verstößt (diskriminierende,
              beleidigende usw. Inhalte), kannst du dies an uns melden. </p>
            <p>Sowohl Fragen als auch Wörterbucheinträge kannst du melden, indem du auf der Kachel rechts oben auf die
              drei Punkte klickst und „melden“ auswählst. </p>
            <p>Beachte jedoch auch, dass vulgäre oder beleidigende Wörter sehr wohl zum Zweck der Dokumentation zulässig
              sind, sofern sie als solche bei der Eingabe gekennzeichnet werden. In den Account-Einstellungen (klicke
              rechts oben auf deinen Benutzernamen) kannst du auswählen, ob du entsprechende Einträge sehen
              möchtest.</p>
            <div class="img img-report"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>


        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich ein Wort hinzufügen? Wie kann ich einen Wörterbuchbeitrag erstellen?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Um ein Wort hinzuzufügen und einen Wörterbucheintrag zu erstellen, kannst du unter
              <v-icon color="black" small>mdi-plus</v-icon>
              Wort erstellen
              zwischen drei Modi wählen, die sich darin unterscheiden, wie viele Informationen zum Wort abgefragt
              werden. Pflichtfelder sind das Lemma, also das Wort sowie entweder eine standarddeutsche Entsprechung oder
              eine Bedeutungserklärung.
            </p>
            <ul>
              <li> Unter <b>Anfänger*in</b> werden nur grundlegende Informationen eingetragen.</li>
              <li> Als <b>Sammler*in</b> beschäftigst du dich schon mehr mit dem Wort.</li>
              <li> Für <b>Lexikograph*in</b> musst du vielleicht sogar recherchieren.</li>

            </ul>
            <p>Alle Felder geben dir mit einem Tooltip eine Erklärung, was genau du eintragen sollst. Fahre dafür
              einfach über das Fragezeichen
              <v-icon color="black" small>mdi-help-circle-outline</v-icon>
              oder bei den Wortarten direkt über das Feld.
            </p>
            <div class="img img-word-create"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Wie kann ich mich mit anderen vergleichen? Wo sehe ich, wie viele Wörter ich schon eingetragen habe?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Unter
              <v-icon color="black" small>mdi-chart-line</v-icon>
              Bestenliste findest du die Rangliste der fleißigsten Wörtersammler insgesamt und die der letzten zwei
              Wochen.
            </p>
            <div class="img img-highscore"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "FAQ"
}
</script>

<style scoped>
.img-navigation {
  background: url(../assets/faq/navigation.png);
  height: 456px;

}

.img {
  border: solid 1px lightgray;
  border-radius: 5px;
}

.img-search {
  margin: 10px auto;
  height: 300px;
  max-width: 600px;
  background: url(../assets/faq/Suchen.png) no-repeat;
  background-size: contain;
}

.img-sort {
  margin: 10px auto;
  height: 150px;
  width: 750px;
  background: url(../assets/faq/Sortieren.png) no-repeat;
  background-size: contain;
}

.img-view {
  margin: 10px auto;
  height: 180px;
  max-width: 100%;
  background: url(../assets/faq/Kachel und Listenansicht.png) no-repeat;
  background-size: contain;
}

.img-like {
  margin: 10px auto;
  height: 300px;
  max-width: 70%;
  background: url(../assets/faq/liken und kommentieren.png) no-repeat;
  background-size: contain;
}

.img-collection {
  margin: 10px auto;
  height: 240px;
  max-width: 70%;
  background: url(../assets/faq/Sammlungen.png) no-repeat;
  background-size: contain;
}

.img-create-group-collection {
  margin: 10px auto;
  height: 320px;
  max-width: 70%;
  background: url(../assets/faq/Gruppensammlung_erstellen.png) no-repeat;
  background-size: contain;
}

.img-create-group {
  margin: 10px auto;
  height: 210px;
  max-width: 70%;
  background: url(../assets/faq/GruppenErstellen.png) no-repeat;
  background-size: contain;
}
.img-add-word{
  margin: 10px auto;
  height: 300px;
  max-width: 750px;
  background: url(../assets/faq/WortHinzufügen2.png) no-repeat;
  background-size: contain;
}

.img-invite{
  margin: 10px auto;
  height: 312px;
  max-width: 80%;
  background: url(../assets/faq/Einladung.png) no-repeat;
  background-size: contain;
}

.img-member{
  margin: 10px auto;
  height: 312px;
  max-width: 80%;
  background: url(../assets/faq/Mitglieder.png) no-repeat;
  background-size: contain;
}
.img-post{
  margin: 10px auto;
  height: 312px;
  max-width: 80%;
  background: url(../assets/faq/Fragen.png) no-repeat;
  background-size: contain;
}

.img-report{
  margin: 10px auto;
  height: 280px;
  max-width: 80%;
  background: url(../assets/faq/melden.png) no-repeat;
  background-size: contain;
}

.img-word-create{
  margin: 10px auto;
  height: 290px;
  max-width: 80%;
  background: url(../assets/faq/Worterstellen.png) no-repeat;
  background-size: contain;
}

.img-highscore{
  margin: 10px auto;
  height: 290px;
  max-width: 75%;
  background: url(../assets/faq/Bestenliste.png) no-repeat;
  background-size: contain;
}
.vid{
  display: block;
  margin: 10px auto auto;

}

.vid-container{

  margin: auto;
  margin-top: 10px;
  overflow: hidden;
  width: 500px;
  height: 280px;
  border-radius: 5px;
}

.gif-register {
  margin: auto;
  height: 300px;
  width: 500px;
  background-size: cover;
}

.v-icon {
  margin-bottom: 3px;
}
</style>