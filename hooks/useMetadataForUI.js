import { host, permission } from "../utils/constants";

export default function useMetadataForUI() {
  const getMetadataForUI = async (
    library,
    bookID,
    categoryID = null,
    IAIdentifier = ""
  ) => {
    try {
      switch (library) {
        case "gb":
          const gbRes = await fetch(
            `${host}/getMetadata?option=${"gb"}&bookID=${bookID}`
          );
          const gbMetadata = await gbRes.json();
          let {
            title: gb_title,
            subtitle: gb_subtitle,
            authors: gb_authors,
            publisher: gb_publisher,
            publishedDate: gb_publishedDate,
            language: gb_language,
            pageCount: gb_pageCount,
            infoLink: gb_infoLink,
          } = gbMetadata.volumeInfo;

          const gb_authorsFormatted = gb_authors
            ? gb_authors.join().trim()
            : "";
          const gb_commonsMetadata = `== {{int:filedesc}} ==
{{Book
| Author             = ${gb_authorsFormatted}
| Translator         =
| Editor             =
| Illustrator        =
| Title              = ${gb_title || ""}
| Series title       =
| Volume             =
| Edition            =
| Publisher          = ${gb_publisher || ""}
| Printer            =
| Publication date   = ${gb_publishedDate || ""}
| City               =
| Language           = ${gb_language || ""}
| Description        = ${gb_subtitle || ""}
| Source             = ${gb_infoLink || ""}
| Permission         = ${permission}
| Image              =
| Image page         =
| Pageoverview       =
| Wikisource         =
| Homecat            =
| Other_versions     =
| ISBN               =
| LCCN               =
| OCLC               =
| References         =
| Linkback           =
| Wikidata           =
| noimage            =
| Other_fields_1      = {{Information field|name=Rights|value=${
            gbMetadata.accessInfo.accessViewStatus || ""
          }|name=Pages|value=${gb_pageCount || ""}}}
}}

== {{int:license-header}} ==
{{PD-scan}}

[[Category:Files uploaded with BUB2]]
`;
          return gb_commonsMetadata.replace(/&/g, "_");
        case "trove":
          const troveRes = await fetch(
            `${host}/getMetadata?option=${"trove"}&bookID=${bookID}`
          );
          const troveJson = await troveRes.json();
          const troveMetadata = troveJson.article;
          let {
            title: trove_title,
            date: trove_date,
            troveUrl: trove_url,
            page: trove_page,
            identifier: trove_identifier,
            heading: trove_heading,
            category: trove_category,
          } = troveMetadata;

          const trove_commonsMetadata = `== {{int:filedesc}} ==
{{Book
| Author                  =
| Translator              =
| Editor                  =
| Illustrator             =
| Title                   = ${trove_heading || ""}
| Series title            =
| Volume                  =
| Edition                 =
| Publisher               =
| Printer                 =
| Publication date        = ${trove_date || ""}
| City                    =
| Language                =
| Description             = ${trove_title.value || ""}
| Source                  = ${trove_url || ""}
| Permission              = ${permission}
| Image                   =
| Image page              =
| Pageoverview            =
| Wikisource              =
| Homecat                 =
| Other_versions          =
| ISBN                    =
| LCCN                    =
| OCLC                    =
| References              =
| Linkback                =
| Wikidata                =
| noimage                 =
| Other_fields_1           = {{Information field|name=Identifier|value=${
            trove_identifier || ""
          }|name=Pages|value=${trove_page || ""}|name=Category|value=${
            trove_category || ""
          }}}
}}

== {{int:license-header}} ==
{{PD-scan}}

[[Category:Files uploaded with BUB2]]
`;
          return trove_commonsMetadata;
        case "pdl":
          const pdlRes = await fetch(
            `${host}/getMetadata?option=${"pdl"}&bookID=${bookID}&categoryID=${categoryID}&IAIdentifier=${IAIdentifier}`
          );
          const pdlMetadata = await pdlRes.json();
          let {
            Script: pdl_script,
            Langauge: pdl_language,
            Publisher: pdl_publisher,
            Pages: pdl_pages,
            description: pdl_description,
            title: pdl_title,
            coverImage: pdl_coverImage,
            pdfUrl: pdl_pdfUrl,
            IAIdentifier: pdl_identifier,
          } = pdlMetadata;
          const pdl_commonsMetadata = `== {{int:filedesc}} ==
{{Book
| Author                     =
| Translator                 =
| Editor                     =
| Illustrator                =
| Title                      = ${pdl_title || ""}
| Series title               =
| Volume                     =
| Edition                    =
| Publisher                  = ${pdl_publisher || ""}
| Printer                    =
| Publication date           =
| City                       =
| Language                   = ${pdl_language || ""}
| Description                = ${pdl_description || ""}
| Source                     = ${pdl_pdfUrl || ""}
| Permission                 = ${permission}
| Image                      = ${pdl_coverImage || ""}
| Image page                 =
| Pageoverview               =
| Wikisource                 =
| Homecat                    =
| Other_versions             =
| ISBN                       =
| LCCN                       =
| OCLC                       =
| References                 =
| Linkback                   =
| Wikidata                   =
| noimage                    =
| Other_fields_1              = {{Information field|name=Identifier|value=${
            pdl_identifier || ""
          }|name=Pages|value=${pdl_pages || ""}|name=Script|value=${
            pdl_script || ""
          }}}
}}

== {{int:license-header}} ==
{{PD-scan}}

[[Category:Files uploaded with BUB2]]
`;
          return pdl_commonsMetadata;
          break;
      }
    } catch (error) {
      return error;
    }
  };

  return { getMetadataForUI };
}
