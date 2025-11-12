import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function FAQ() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Vault Launcher?</AccordionTrigger>
            <AccordionContent>
              Vault Launcher is a modern, open-source game launcher designed to
              help you download and play games from various sources like FitGirl
              and SteamRip.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I download games?</AccordionTrigger>
            <AccordionContent>
              Simply browse the games section, select a game that is in one of
              our sources, and follow the download instructions provided by the
              source. Vault Launcher integrates seamlessly with supported
              sources.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Are the downloads safe?</AccordionTrigger>
            <AccordionContent>
              Yes the downloads come from trusted sources such as SteamRIP.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What sources does Vault support?
            </AccordionTrigger>
            <AccordionContent>
              Vault Launcher supports downloads from FitGirl and SteamRip,
              providing access to a wide range of game repacks and cracks.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is Vault Launcher free?</AccordionTrigger>
            <AccordionContent>
              Yes, Vault Launcher is completely free and open-source. You can
              download it from our GitHub repository.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Do I need Steam to use Vault?</AccordionTrigger>
            <AccordionContent>
              No, Vault Launcher is independent of Steam. It allows you to
              download and play games from alternative sources without requiring
              a Steam account.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              What Platforms does Vault Support?
            </AccordionTrigger>
            <AccordionContent>
              Currently, Vault only supports Windows 10 and 11, but Linux
              support is in development and will be released in the future.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
