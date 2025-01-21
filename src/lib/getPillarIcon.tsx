import Image from 'next/image';

export const getPillarIcon = (pillarName: string) => {
  switch (pillarName) {
    case 'Financial':
      return (
        <Image 
          src="https://static.wixstatic.com/media/af616c_29340f0ac2544ea0b413a7d67075a5a2~mv2.png"
          alt="Financial icon"
          width={32}
          height={32}
          className="object-contain"
        />
      );
    case 'Health':
      return (
        <Image 
          src="https://static.wixstatic.com/media/af616c_b6f5c191747244d3bd07ab3fce1bcf94~mv2.png"
          alt="Health icon"
          width={32}
          height={32}
          className="object-contain"
        />
      );
    case 'Relationships':
      return (
        <Image 
          src="https://static.wixstatic.com/media/af616c_4a5f9c62983540fb8acb46d96c216469~mv2.png"
          alt="Relationships icon"
          width={32}
          height={32}
          className="object-contain"
        />
      );
    default:
      return null;
  }
};